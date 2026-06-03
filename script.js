/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

/* GitHub Images */
const BASE = 'https://github.com/abhishektech10/photographerportfolio/releases/download/Picture/';
const IMG  = (n) => `${BASE}pic${n}.jpg`;

const IMGS = {
  lakeside:  IMG(1),
  bridge:    IMG(2),
  cat:       IMG(3),

  // Reused images for remaining gallery items
  forest:    IMG(1),
  wildlife1: IMG(1),
  wildlife2: IMG(2),
  nature1:   IMG(2),
  nature2:   IMG(1),
  animal1:   IMG(3),
  animal2:   IMG(3),
  land1:     IMG(2),
  land2:     IMG(1),
};

const realPhotos = [
  {
    id: 'r1',
    src: IMGS.lakeside,
    cat: 'wildlife',
    title: 'First Light, Last Wild',
    location: 'Arctic Tundra, Norway',
    price: '$89',
    desc: 'At −28°C, Haru waited seven hours in a snow blind for this moment — a reminder of why the wild must be protected.'
  },
  {
    id: 'r2',
    src: IMGS.bridge,
    cat: 'nature',
    title: 'Canopy & Silence',
    location: 'Borneo Rainforest, Malaysia',
    price: '$75',
    desc: 'Three weeks off-grid in the Borneo interior. The rainforest rewarded patience with a frame shortlisted for Nature Photographer of the Year.'
  },
  {
    id: 'r3',
    src: IMGS.cat,
    cat: 'portrait',
    title: 'Woman in the Storm',
    location: 'Iceland',
    price: '$95',
    desc: 'Self-portrait on a remote timer in extreme weather conditions.'
  }
];

const photos = [
  { id:'r1',  src:IMGS.lakeside,  isReal:true, cat:'wildlife',  title:'First Light, Last Wild', location:'Arctic Tundra, Norway', price:'$89' },
  { id:'r2',  src:IMGS.bridge,    isReal:true, cat:'nature',    title:'Canopy & Silence', location:'Borneo Rainforest, Malaysia', price:'$75' },
  { id:'r3',  src:IMGS.cat,       isReal:true, cat:'portrait',  title:'Woman in the Storm', location:'Iceland', price:'$95' },

  { id:'p4',  src:IMGS.wildlife1, isReal:true, cat:'wildlife',  title:'The Sovereign', location:'Masai Mara, Kenya', price:'$65' },
  { id:'p5',  src:IMGS.nature1,   isReal:true, cat:'nature',    title:'Cathedral Forest', location:'Olympic NP, USA', price:'$55' },
  { id:'p6',  src:IMGS.animal1,   isReal:true, cat:'animal',    title:'The Matriarch', location:'Amboseli, Kenya', price:'$72' },
  { id:'p7',  src:IMGS.land1,     isReal:true, cat:'landscape', title:'Above the Clouds', location:'Patagonia, Chile', price:'$80' },
  { id:'p8',  src:IMGS.wildlife2, isReal:true, cat:'wildlife',  title:'Thermal Rider', location:'Grand Canyon, USA', price:'$58' },
  { id:'p9',  src:IMGS.nature2,   isReal:true, cat:'nature',    title:'The Wave Breaks', location:'Nazaré, Portugal', price:'$69' },
  { id:'p10', src:IMGS.animal2,   isReal:true, cat:'animal',    title:'Pack Leader', location:'Yellowstone, USA', price:'$77' },
  { id:'p11', src:IMGS.land2,     isReal:true, cat:'landscape', title:'Golden Delta', location:'Okavango Delta, Botswana', price:'$84' },
  { id:'p12', src:IMGS.forest,    isReal:true, cat:'nature',    title:'Metamorphosis', location:'Costa Rica', price:'$48' }
];
