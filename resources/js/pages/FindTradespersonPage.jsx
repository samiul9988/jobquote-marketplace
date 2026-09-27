import React, { useState, useRef, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Camera, Minus, Plus, CheckCircle } from 'lucide-react';

const BLUE = '#1F5FD1';

const TRADES = {
  carpentry: {
    label: 'Carpentry / Joinery',
    firstQ: 'What type of joinery work do you need?',
    first: [
      { v: 'Doors & Windows', d: 'Fitting & Repairing Doors & Windows' },
      { v: 'Furniture Making & Assembly', d: 'Flat Pack Furniture, Wardrobes, Beds, Cabinets, etc' },
      { v: 'Bespoke Work', d: 'Fitted Furniture, Media Walls, Loft Hatches, Rails, Understairs' },
      { v: 'Kitchen Units & Worktops', d: 'Kitchen Fitting, Adjustments, Worktops & Cupboards' },
      { v: 'Flooring & Skirting', d: 'Floor Installation, Repair Work, Skirting, Architraves & Loft Boarding' },
      { v: 'Sheds, Decking & Fencing', d: 'Other Outdoor Structures including Pergolas, Gazebos, etc' },
      { v: 'General Repair Work' },
      { v: 'Staircases' },
      { v: 'Roofing, Soffits & Fascias' },
      { v: 'Other' },
    ],
  },
  painting: {
    label: 'Painting & Decorating',
    firstQ: 'What type of decorating work do you need?',
    first: [
      { v: 'Internal Painting & Decorating', d: 'Wall, ceiling & woodwork painting, wallpapering, etc' },
      { v: 'External Painting', d: 'House exterior painting, sheds, fencing, decking, masonry, etc' },
      { v: 'UPVC Spraying' },
      { v: 'Other' },
    ],
  },
};

const PAINT_WORK = ['Painting', 'Wallpapering', 'Wallpaper Removal', 'Some Repair Work (minor plastering)', 'Other'];
const PAINT_WHAT = [
  { v: 'Rooms', d: 'Walls & Ceilings, etc' },
  { v: 'Woodwork', d: 'Doors, Frames, Skirting, Staircases, Windows, Cupboards, etc' },
  { v: 'Metalwork', d: 'Radiators, Metal Staircases, etc' },
  { v: 'Other' },
];
const PAINT_ROOMS = ['Just a small area', '1 to 2 rooms', '3 to 4 rooms', '5 to 6 rooms', '7 or more rooms'];
const PAINT_MAT = ['Yes, I need all of the materials supplying', 'I only need some of the materials supplying', 'No, I will supply all of the materials'];
const EXT_WHAT = ['External Walls', 'Fencing / Gates', 'Soffits & Fascias', 'Doors / Windows', 'Sheds', 'Decking', 'Other'];
const EXT_WALLS_QTY = ['Only a small area', '1 wall', '2 to 3 walls', '4 walls or more', 'Other'];
const EXT_FENCE_QTY = ['Just 1', '2 to 4', '5 to 10', '11 to 20', '20+'];
const EXT_MAT = ['Yes', 'No'];

const WINDOW_TYPES = ['Door Fitting', 'Window Fitting', 'Laminate Fitting', 'Repair Work', 'Other'];
const DOOR_WORK = ['I need brand new doorway fitting', 'I need door hanging / trimming', 'Fitted door, replacing / recutting', 'Other'];
const DOOR_COUNT = ['1 door', '2 to 4 doors', '5 to 7 doors', '8+ doors'];
const DOOR_MATERIAL = ['Oak', 'Hardwood', 'Pine', 'Door frames', 'Other'].map((v) => v);

const FURN_NEED = ['I need furniture assembled', 'I need bespoke furniture made', 'I need furniture repaired', 'Other'];
const FURN_ASSEMBLE = ['Bed frames', 'Wardrobes', 'Chests of drawers', 'Desks', 'Tables', 'Chairs', 'Shelving units', 'Other'];
const FURN_COUNT = ['1', '2 to 4', '5 to 8', '9+'];
const FURN_EXTRA = ['None', 'Removal of old items', 'Furniture disassembly'];
const FURN_MAKE = ['Bespoke storage (wardrobes, cupboards, shelving, etc)', 'Custom kitchen units', 'Other'];

const KIT_TYPE = ['Full Kitchen Installation', 'Fit kitchen units', 'Fit kitchen worktops', 'Paint kitchen units', 'Repairs / Adjustments', 'Other'];
const KIT_COUNT = ['1 unit', '2 to 10', '11 to 20', '21 to 30', '30+'];

const FLOOR_TYPE = ['Floor Fitting', 'Stair Work', 'Floorboards', 'Repair Work', 'Skirting & Architraves', 'Loft Boarding', 'Other'];
const FLOOR_MAT = ['Laminate', 'Engineered wood', 'Hardwood', 'Parquet', 'Other'];
const FLOOR_ROOMS = ['1 room', '2 rooms', '3 rooms', '4+ rooms'];
const FLOOR_SUPPLY = ['Flooring', 'Underlay', 'Trims / Beading', 'Nothing, I will supply all'];
const YES_NO = ['Yes', 'No'];
const FLOOR_OLD = ['Carpet', 'Laminate', 'Tiles', 'Other'];

// Generic single/multi choice steps (rendered by key in the step list)
const GEN = {
  outInvolve: { title: 'What does your work involve?', opts: [
    { v: 'Sheds', d: 'New installation or replacement of a shed' },
    { v: 'Fencing & Gates', d: 'New installation or replacement of fencing or gates' },
    { v: 'Decking', d: 'New installation or replacement of decking' },
    { v: 'Other Outdoor Structure', d: 'Installation or removal of pergolas, gazebos, etc' },
    'Repair / Maintenance', 'Other'] },
  shedWork: { title: 'Please select what work you need doing', opts: ['Shed assembly', 'Other structure assembly', 'Shed removal', 'Other'] },
  shedSize: { title: 'What size is the shed?', opts: ['Small', 'Medium', 'Large', 'Not sure'] },
  shedBase: { title: 'Will you need a concrete base installed?', opts: ['Yes', 'No', 'Not sure'] },
  shedExtra: { title: 'Please select any additional work you need doing', multi: true, note: 'Choose as many as you need', opts: ['Shed painting / staining', 'Base preparation', 'Old shed removal', 'None'] },
  fenceWork: { title: 'What type of fencing work do you require?', opts: ['New fence installation', 'Fence replacement', 'Fence repair', 'Gates', 'Other'] },
  fenceRemove: { title: 'Do you need the old fencing removed?', opts: ['Yes', 'No'] },
  fenceMat: { title: 'What material would you like?', opts: ['Timber', 'Composite', 'Metal', 'Other'] },
  fenceLen: { title: 'How long is the fence?', opts: ['Up to 5 metres', '5 to 10 metres', '10 to 20 metres', '20+ metres'] },
  fenceHeight: { title: 'How high should the fence be?', opts: ['Up to 1 metre', '1 to 1.5 metres', '1.5 to 2 metres', 'Over 2 metres'] },
  fenceGates: { title: 'How many gates do you need?', opts: ['None', '1', '2', '3+'] },
  fenceFinish: { title: 'Do you need the fencing painting or staining?', opts: ['Yes', 'No'] },
  deckWork: { title: 'What type of decking work do you require?', opts: [
    { v: 'New installation / replacement', d: 'Build a new deck or replace an existing one' },
    { v: 'Repair / refurbishment', d: 'Repair boards, joists or steps' },
    { v: 'Clean, oil or stain', d: 'Cleaning and treating existing decking' },
    'Other'] },
};

const card = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 4 };
const heading = { fontSize: 16, fontWeight: 700, color: '#3B4257', margin: '0 0 12px' };

function Options({ options, value, onChange, multi }) {
  return (
    <div style={card}>
      {options.map((o, i) => {
        const opt = typeof o === 'string' ? { v: o } : o;
        const on = multi ? value.includes(opt.v) : value === opt.v;
        return (
          <label
            key={opt.v}
            style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', cursor: 'pointer', borderTop: i ? '1px solid #EEF1F6' : 'none', background: on ? '#F1F5F9' : '#fff' }}
          >
            <input
              type={multi ? 'checkbox' : 'radio'}
              checked={on}
              onChange={() => onChange(opt.v)}
              style={{ accentColor: BLUE, width: 16, height: 16 }}
            />
            <span>
              <span style={{ display: 'block', color: BLUE, fontSize: 14, fontWeight: 600 }}>{opt.v}</span>
              {opt.d && <span style={{ display: 'block', color: '#64748B', fontSize: 12, marginTop: 2 }}>{opt.d}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function Btn({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ width: '100%', marginTop: 14, padding: '16px', background: BLUE, color: '#fff', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: 15, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
    >
      {children}
    </button>
  );
}

const Block = ({ title, note, children }) => (
  <section style={{ marginBottom: 56 }}>
    <h3 style={heading}>{title}</h3>
    {note && <p style={{ fontSize: 12, color: '#64748B', margin: '-6px 0 10px' }}>{note}</p>}
    {children}
  </section>
);

export default function FindTradespersonPage() {
  const { flash } = usePage().props;
  const initial = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('trade');
  const [trade, setTrade] = useState(TRADES[initial] ? initial : 'carpentry');
  const [a, setA] = useState({});
  const [stage, setStage] = useState(0);
  const [desc, setDesc] = useState('');
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();
  const endRef = useRef();
  const cfg = TRADES[trade];

  // Build the ordered step list from the answers so far.
  const steps = ['first'];
  if (trade === 'carpentry' && a.first === 'Doors & Windows') {
    steps.push('kind');
    if (a.kind === 'Door Fitting') steps.push('doorWork', 'doorCount', 'doorMat');
  }
  if (trade === 'painting' && a.first === 'Internal Painting & Decorating') {
    steps.push('paintWork');
    const pw = a.paintWork || [];
    if (pw.includes('Painting')) {
      steps.push('paintWhat');
      if (a.paintWhat === 'Rooms') steps.push('paintRooms');
    }
    if (pw.includes('Wallpapering')) steps.push('paintWallRooms');
    if (pw.length) steps.push('paintMat');
  }
  if (trade === 'painting' && a.first === 'External Painting') {
    steps.push('extWhat');
    if ((a.extWhat || []).includes('External Walls')) steps.push('extWallsQty');
    if ((a.extWhat || []).includes('Fencing / Gates')) steps.push('extFenceQty');
    if ((a.extWhat || []).length) steps.push('extMat');
  }
  if (trade === 'carpentry' && a.first === 'Furniture Making & Assembly') {
    steps.push('furnNeed');
    if (a.furnNeed === 'I need furniture assembled') steps.push('furnItems', 'furnCount', 'furnExtra');
    if (a.furnNeed === 'I need bespoke furniture made') steps.push('furnMake');
  }
  if (trade === 'carpentry' && a.first === 'Kitchen Units & Worktops') {
    steps.push('kitType');
    if (['Full Kitchen Installation', 'Fit kitchen units'].includes(a.kitType)) steps.push('kitCount');
  }
  if (trade === 'carpentry' && a.first === 'Flooring & Skirting') {
    steps.push('floorType');
    if (a.floorType === 'Floor Fitting') {
      steps.push('floorMat', 'floorRooms', 'floorSupply', 'floorRemove');
      if (a.floorRemove === 'Yes') steps.push('floorOld');
    }
  }
  if (trade === 'carpentry' && a.first === 'Sheds, Decking & Fencing') {
    steps.push('outInvolve');
    if (a.outInvolve === 'Sheds') {
      steps.push('shedWork');
      if (a.shedWork === 'Shed assembly') steps.push('shedSize', 'shedBase', 'shedExtra');
      if (a.shedWork === 'Shed removal') steps.push('shedSize');
    }
    if (a.outInvolve === 'Fencing & Gates') {
      steps.push('fenceWork', 'fenceRemove', 'fenceMat', 'fenceLen', 'fenceHeight', 'fenceGates', 'fenceFinish');
    }
    if (a.outInvolve === 'Decking') steps.push('deckWork');
  }
  steps.push('desc', 'photos');

  useEffect(() => {
    if (stage > 0 && endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [stage]);

  const reset = (t) => { setTrade(t); setA({}); setStage(0); };
  const set = (key, val) => {
    const idx = steps.indexOf(key);
    const keep = {};
    steps.slice(0, idx).forEach((k) => { if (a[k] !== undefined) keep[k] = a[k]; });
    keep[key] = val;
    setA(keep);
    setStage(idx);
    return keep;
  };
  const next = (key) => setStage(Math.max(stage, steps.indexOf(key) + 1));
  const toggleMat = (v) => {
    const cur = a.doorMat || [];
    setA({ ...a, doorMat: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
  };
  const toggleList = (key) => (v) => {
    const cur = a[key] || [];
    setA({ ...a, [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
  };
  const toggleWork = (v) => {
    const cur = a.doorWork || [];
    setA({ ...a, doorWork: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
  };

  const addPhotos = (e) => {
    setPhotos([...photos, ...Array.from(e.target.files)].slice(0, 5));
    e.target.value = '';
  };

  const submit = () => {
    const answers = {};
    answers[cfg.firstQ] = a.first;
    if (a.kind) answers['What type of work is it?'] = a.kind;
    if (a.doorWork) answers['What door fitting work do you require?'] = a.doorWork;
    if (a.doorCount) answers['How many doors need hanging?'] = a.doorCount;
    if (a.doorMat) answers['Which materials would you like the trade to supply?'] = a.doorMat;
    if (a.paintWork) answers['What type of decorating work is required?'] = a.paintWork;
    if (a.paintWhat) answers['What needs painting?'] = a.paintWhat;
    if (a.paintRooms) answers['How many rooms require painting?'] = a.paintRooms;
    if (a.paintWallRooms) answers['How many rooms require wallpapering?'] = a.paintWallRooms;
    if (a.paintMat) answers['Do you need the tradesperson to supply materials?'] = a.paintMat;
    if (a.extWhat) answers['What do you need painting?'] = a.extWhat;
    if (a.extWallsQty) answers['How many external walls require the work?'] = a.extWallsQty;
    if (a.extFenceQty) answers['How many fence panels / gates require painting?'] = a.extFenceQty;
    if (a.extMat) answers['Will you need the paint supplying by the tradesperson?'] = a.extMat;
    if (a.furnNeed) answers['What do you need?'] = a.furnNeed;
    if (a.furnItems) answers['What needs assembling?'] = a.furnItems;
    if (a.furnCount) answers['How many items need assembling?'] = a.furnCount;
    if (a.furnExtra) answers['Additional services'] = a.furnExtra;
    if (a.furnMake) answers['What kind of furniture do you need making?'] = a.furnMake;
    if (a.kitType) answers['What type of work is it?'] = a.kitType;
    if (a.kitCount) answers['How many kitchen cupboards / units need fitting?'] = a.kitCount;
    if (a.floorType) answers['What type of work is it?'] = a.floorType;
    if (a.floorMat) answers['What flooring material are you laying?'] = a.floorMat;
    if (a.floorRooms) answers['How many rooms need flooring?'] = a.floorRooms;
    if (a.floorSupply) answers['Materials the tradesperson should supply'] = a.floorSupply;
    if (a.floorRemove) answers['Old flooring needs removing first?'] = a.floorRemove;
    if (a.floorOld) answers['Type of flooring being removed'] = a.floorOld;
    steps.forEach((k) => { if (GEN[k] && a[k] !== undefined) answers[GEN[k].title] = a[k]; });
    const fd = new FormData();
    fd.append('trade', cfg.label);
    fd.append('answers', JSON.stringify(answers));
    fd.append('description', desc);
    photos.forEach((p) => fd.append('photos[]', p));
    router.post('/find-tradesperson', fd, {
      forceFormData: true,
      preserveScroll: true,
      onStart: () => setSaving(true),
      onError: (e) => setErrors(e),
      onSuccess: () => setDone(true),
      onFinish: () => setSaving(false),
    });
  };

  const show = (k) => stage >= steps.indexOf(k);
  const input = { width: '100%', padding: '12px', border: '1px solid #E2E8F0', borderRadius: 4, fontSize: 14, marginBottom: 10, boxSizing: 'border-box', fontFamily: 'inherit' };

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5FE', fontFamily: 'Montserrat, Inter, sans-serif' }}>
      <Head title="Find a Tradesperson - SK Home Solutions UK" />
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '24px 20px 60px' }}>
        <a href="/" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', fontWeight: 900, fontSize: 24, color: '#242D8A', marginBottom: 36 }}>
          SK Home <span style={{ color: '#F26522' }}>Solutions UK</span>
        </a>

        {done ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <CheckCircle size={56} color="#16A34A" />
            <h2 style={{ color: '#3B4257' }}>Thank you!</h2>
            <p style={{ color: '#475569' }}>{flash?.success || 'Your quote request has been submitted.'} We will be in touch shortly.</p>
            <a href="/" style={{ color: BLUE, fontWeight: 700 }}>Back to home</a>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#3B4257', margin: '0 0 8px' }}>Find a Tradesperson</h1>
            <p style={{ fontSize: 14, color: '#475569', margin: '0 0 28px' }}>
              Get FREE Quotes from up to 3 local tradespeople with our quick and easy connection platform. Compare quotes & save money on your job!
            </p>

            <Block title="What type of work do you need doing?">
              <select value={trade} onChange={(e) => reset(e.target.value)} style={{ ...input, background: '#fff', fontWeight: 600, marginBottom: 0 }}>
                {Object.entries(TRADES).map(([k, t]) => <option key={k} value={k}>{t.label}</option>)}
              </select>
            </Block>

            <Block title={cfg.firstQ}>
              <Options options={cfg.first} value={a.first} onChange={(v) => { set('first', v); setStage(1); }} />
            </Block>

            {steps.includes('kind') && show('kind') && (
              <Block title="What type of work is it?">
                <Options options={WINDOW_TYPES} value={a.kind} onChange={(v) => { set('kind', v); }} />
                <Btn disabled={!a.kind} onClick={() => next('kind')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('doorWork') && show('doorWork') && (
              <Block title="What door fitting work do you require?" note="Choose as many as you need">
                <Options multi options={DOOR_WORK} value={a.doorWork || []} onChange={toggleWork} />
                <Btn disabled={!(a.doorWork || []).length} onClick={() => next('doorWork')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('doorCount') && show('doorCount') && (
              <Block title="How many doors need hanging?">
                <Options options={DOOR_COUNT} value={a.doorCount} onChange={(v) => set('doorCount', v)} />
                <Btn disabled={!a.doorCount} onClick={() => next('doorCount')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('doorMat') && show('doorMat') && (
              <Block title="Which materials would you like the trade to supply?" note="Choose as many as you need">
                <Options multi options={DOOR_MATERIAL} value={a.doorMat || []} onChange={toggleMat} />
                <Btn disabled={!(a.doorMat || []).length} onClick={() => next('doorMat')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('paintWork') && show('paintWork') && (
              <Block title="What type of decorating work is required?" note="Tick as many as required">
                <Options multi options={PAINT_WORK} value={a.paintWork || []} onChange={toggleList('paintWork')} />
                <Btn disabled={!(a.paintWork || []).length} onClick={() => next('paintWork')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('paintWhat') && show('paintWhat') && (
              <Block title="What needs painting?">
                <Options options={PAINT_WHAT} value={a.paintWhat} onChange={(v) => set('paintWhat', v)} />
                <Btn disabled={!a.paintWhat} onClick={() => next('paintWhat')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('paintRooms') && show('paintRooms') && (
              <Block title="How many rooms require painting?">
                <Options options={PAINT_ROOMS} value={a.paintRooms} onChange={(v) => set('paintRooms', v)} />
                <Btn disabled={!a.paintRooms} onClick={() => next('paintRooms')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('paintWallRooms') && show('paintWallRooms') && (
              <Block title="How many rooms require wallpapering?">
                <Options options={PAINT_ROOMS} value={a.paintWallRooms} onChange={(v) => set('paintWallRooms', v)} />
                <Btn disabled={!a.paintWallRooms} onClick={() => next('paintWallRooms')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('paintMat') && show('paintMat') && (
              <Block title="Do you need the tradesperson to supply materials?">
                <Options options={PAINT_MAT} value={a.paintMat} onChange={(v) => set('paintMat', v)} />
                <Btn disabled={!a.paintMat} onClick={() => next('paintMat')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('extWhat') && show('extWhat') && (
              <Block title="What do you need painting?" note="Tick as many as required">
                <Options multi options={EXT_WHAT} value={a.extWhat || []} onChange={toggleList('extWhat')} />
                <Btn disabled={!(a.extWhat || []).length} onClick={() => next('extWhat')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('extWallsQty') && show('extWallsQty') && (
              <Block title="How many external walls require the work?">
                <Options options={EXT_WALLS_QTY} value={a.extWallsQty} onChange={(v) => set('extWallsQty', v)} />
                <Btn disabled={!a.extWallsQty} onClick={() => next('extWallsQty')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('extFenceQty') && show('extFenceQty') && (
              <Block title="How many fence panels / gates require painting?">
                <Options options={EXT_FENCE_QTY} value={a.extFenceQty} onChange={(v) => set('extFenceQty', v)} />
                <Btn disabled={!a.extFenceQty} onClick={() => next('extFenceQty')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('extMat') && show('extMat') && (
              <Block title="Will you need the paint supplying by the tradesperson?">
                <Options options={EXT_MAT} value={a.extMat} onChange={(v) => set('extMat', v)} />
                <Btn disabled={!a.extMat} onClick={() => next('extMat')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('furnNeed') && show('furnNeed') && (
              <Block title="What do you need?">
                <Options options={FURN_NEED} value={a.furnNeed} onChange={(v) => set('furnNeed', v)} />
                <Btn disabled={!a.furnNeed} onClick={() => next('furnNeed')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('furnItems') && show('furnItems') && (
              <Block title="What needs assembling?" note="Choose as many as you need">
                <Options multi options={FURN_ASSEMBLE} value={a.furnItems || []} onChange={toggleList('furnItems')} />
                <Btn disabled={!(a.furnItems || []).length} onClick={() => next('furnItems')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('furnCount') && show('furnCount') && (
              <Block title="How many items need assembling?">
                <Options options={FURN_COUNT} value={a.furnCount} onChange={(v) => set('furnCount', v)} />
                <Btn disabled={!a.furnCount} onClick={() => next('furnCount')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('furnExtra') && show('furnExtra') && (
              <Block title="Please select any additional services you need?" note="Choose as many as you need">
                <Options multi options={FURN_EXTRA} value={a.furnExtra || []} onChange={toggleList('furnExtra')} />
                <Btn disabled={!(a.furnExtra || []).length} onClick={() => next('furnExtra')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('furnMake') && show('furnMake') && (
              <Block title="What kind of furniture do you need making?">
                <Options options={FURN_MAKE} value={a.furnMake} onChange={(v) => set('furnMake', v)} />
                <Btn disabled={!a.furnMake} onClick={() => next('furnMake')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('kitType') && show('kitType') && (
              <Block title="What type of work is it?">
                <Options options={KIT_TYPE} value={a.kitType} onChange={(v) => set('kitType', v)} />
                <Btn disabled={!a.kitType} onClick={() => next('kitType')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('kitCount') && show('kitCount') && (
              <Block title="How many kitchen cupboards / units need fitting?">
                <Options options={KIT_COUNT} value={a.kitCount} onChange={(v) => set('kitCount', v)} />
                <Btn disabled={!a.kitCount} onClick={() => next('kitCount')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('floorType') && show('floorType') && (
              <Block title="What type of work is it?">
                <Options options={FLOOR_TYPE} value={a.floorType} onChange={(v) => set('floorType', v)} />
                <Btn disabled={!a.floorType} onClick={() => next('floorType')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('floorMat') && show('floorMat') && (
              <Block title="What flooring material are you laying?">
                <Options options={FLOOR_MAT} value={a.floorMat} onChange={(v) => set('floorMat', v)} />
                <Btn disabled={!a.floorMat} onClick={() => next('floorMat')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('floorRooms') && show('floorRooms') && (
              <Block title="How many rooms need flooring?">
                <Options options={FLOOR_ROOMS} value={a.floorRooms} onChange={(v) => set('floorRooms', v)} />
                <Btn disabled={!a.floorRooms} onClick={() => next('floorRooms')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('floorSupply') && show('floorSupply') && (
              <Block title="Please select which materials you need the tradesperson to supply" note="Choose as many as you need">
                <Options multi options={FLOOR_SUPPLY} value={a.floorSupply || []} onChange={toggleList('floorSupply')} />
                <Btn disabled={!(a.floorSupply || []).length} onClick={() => next('floorSupply')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('floorRemove') && show('floorRemove') && (
              <Block title="Does the old flooring need removing first?">
                <Options options={YES_NO} value={a.floorRemove} onChange={(v) => set('floorRemove', v)} />
                <Btn disabled={!a.floorRemove} onClick={() => next('floorRemove')}>Continue</Btn>
              </Block>
            )}

            {steps.includes('floorOld') && show('floorOld') && (
              <Block title="What type of flooring needs removing?">
                <Options options={FLOOR_OLD} value={a.floorOld} onChange={(v) => set('floorOld', v)} />
                <Btn disabled={!a.floorOld} onClick={() => next('floorOld')}>Continue</Btn>
              </Block>
            )}

            {steps.filter((k) => GEN[k] && show(k)).map((k) => {
              const g = GEN[k];
              const ok = g.multi ? (a[k] || []).length > 0 : !!a[k];
              return (
                <Block key={k} title={g.title} note={g.note}>
                  <Options multi={g.multi} options={g.opts} value={g.multi ? (a[k] || []) : a[k]} onChange={g.multi ? toggleList(k) : (v) => set(k, v)} />
                  <Btn disabled={!ok} onClick={() => next(k)}>Continue</Btn>
                </Block>
              );
            })}

            {show('desc') && (
              <Block title={a.kind === 'Door Fitting' ? 'Tell us more about your door fitting job' : 'Tell us about your job'}>
                <p style={{ fontSize: 13, color: '#475569', margin: '0 0 10px' }}>
                  Please give a description of the job you want doing, including any additional information, and any materials you need the tradesperson to supply.
                </p>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={6} style={{ ...input, resize: 'vertical' }} />
                <Btn onClick={() => next('desc')}>Continue</Btn>
              </Block>
            )}

            {show('photos') && (
              <Block title={<>Add photos <span style={{ fontSize: 13 }}>(OPTIONAL)</span></>}>
                <p style={{ fontSize: 13, color: '#475569', margin: '0 0 12px' }}>
                  A picture tells a thousand words. Adding photos of the work you need doing helps our trades give more accurate quotes.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {photos.map((p, i) => (
                    <div key={i} style={{ position: 'relative', width: 78, height: 78 }}>
                      <img src={URL.createObjectURL(p)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4, border: `2px solid ${BLUE}` }} />
                      <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))} aria-label="Remove" style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', border: `2px solid ${BLUE}`, background: '#fff', color: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                        <Minus size={13} />
                      </button>
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <div style={{ position: 'relative', width: 78, height: 78 }}>
                      <button type="button" onClick={() => fileRef.current.click()} aria-label="Add photo" style={{ width: '100%', height: '100%', borderRadius: 4, border: `2px solid ${BLUE}`, background: BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Camera size={30} />
                      </button>
                      <span style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', border: `2px solid ${BLUE}`, background: '#fff', color: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={13} />
                      </span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={addPhotos} />
                {Object.values(errors).map((m, i) => <p key={i} style={{ color: '#DC2626', fontSize: 13, margin: '10px 0 0' }}>{m}</p>)}
                <Btn disabled={saving} onClick={submit}>{saving ? 'Saving...' : 'Continue / Skip'}</Btn>
              </Block>
            )}
            <div ref={endRef} />
          </>
        )}
      </div>
    </div>
  );
}

FindTradespersonPage.layout = (page) => page;
