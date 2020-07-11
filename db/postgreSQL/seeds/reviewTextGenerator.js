// Random Review Text Generator

// utility functions
const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomIndex = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
};

// word seeds
const opening = ['This product has a very', 'Like everyone has said,', 'One other thing that I', 'Just in case', 'It actually worked for', 'The reason why is that', 'Almost two days ago', 'I bought this for my girlfriend, and', 'I never thought', 'I expected to', 'Today I', 'Ask me how I', 'Completely', 'Nearly', 'The texture of this', 'Last night I', 'My friend', 'My sister', 'A nun told me to buy', 'A funny story', 'So, I bought this', 'I really can\'t', 'I got this to get rid of', 'I was very happy to', 'I can\'t believe', 'This ruined my', 'Never buy', 'Love this', 'This product has', 'Now that the seasons are changing', 'It arrived', 'I was so confused when'];
const verbs = ['accentuate', 'achieve', 'add moisture to', 'add', 'age', 'apply', 'awaken', 'balance', 'banish', 'blend', 'boost', 'boosted by', 'brighten', 'bring to life', 'bronze', 'brush', 'calm', 'clean', 'cleanse', 'clear', 'coat', 'color', 'combine', 'comfort', 'conceal', 'condition', 'contour', 'control', 'cool', 'defend against', 'define', 'defy', 'deliver', 'diffuse', 'eliminate', 'emphasize', 'enhance', 'enjoy', 'erase', 'even out', 'exfoliate', 'experience', 'feel', 'fight', 'fill', 'find', 'firm', 'give', 'glides on', 'goes on', 'heal', 'help', 'highlight', 'holds in', 'hydrate', 'illuminate', 'improve', 'increase', 'infuse', 'invigorate', 'keep', 'last', 'lather', 'lift', 'line', 'lock in', 'look', 'loosen', 'make', 'massage into', 'massage', 'minimize', 'mist', 'moisten', 'moisturize', 'motivate', 'need', 'nourish', 'nurture', 'pamper', 'pat dry', 'pat', 'penetrate', 'plump', 'prep', 'prevent', 'primp', 'promote', 'protect', 'provide', 'pump up', 'purify', 'reduce', 'refine', 'refresh', 'rehydrate', 'rejuvenate', 'release', 'relieve', 'remove', 'repair', 'replenish', 'rescue', 'resist', 'restore', 'reveal', 'revitalize', 'revive', 'rinse', 'rub', 'scrub', 'sculpt', 'seal in', 'set', 'shade', 'shape', 'shield', 'shimmer', 'shine', 'smooth', 'soak', 'soften', 'soothe', 'stays', 'stimulate', 'strengthen', 'stroke', 'style', 'sweep', 'tighten', 'tingle', 'tone', 'touch-up', 'transform', 'treat', 'uncover', 'use', 'vanish', 'wash', 'wear', 'work wonders'];
const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the big', 'a new form of', 'one way of', 'her', 'she', 'I'];
const nouns = ['aging', 'allure', 'amazement', 'amino acids', 'angel', 'antioxidants', 'appeal', 'appearance', 'application', 'appreciation', 'art', 'artistry', 'artwork', 'awe', 'balms', 'beauty', 'blush', 'body', 'botanicals', 'bronze', 'brow', 'care', 'charm', 'charmer', 'cheekbones', 'color', 'complexion', 'composition', 'concealer', 'conditioner', 'contour', 'cosmetic', 'coverage', 'defense', 'definition', 'doll', 'effect', 'elegance', 'emollient', 'enchanter', 'exotic beauty', 'extract', 'eye shadow', 'eyeful', 'eyeliner', 'face wash', 'face', 'fatty acids', 'feet', 'femininity', 'fine lines', 'finish', 'firmness', 'formula', 'foundation', 'fox', 'fragrance', 'glorification', 'glow', 'good looks', 'grace', 'hands', 'healing', 'hydration', 'illumination', 'infatuation', 'infusion', 'ingredient', 'inner beauty', 'jewel', 'lash', 'lip gloss', 'lips', 'lipstick', 'look', 'loveliness', 'luster', 'make-up', 'makeover', 'marvel', 'mascara', 'micro-fibers', 'minerals', 'miracle', 'moisture', 'moisturizer', 'nails', 'nutrient', 'oil', 'pallette', 'perfection', 'pigment', 'pores', 'powder', 'precision', 'product', 'properties', 'protection', 'purity', 'radiance', 'rarity', 'refreshment', 'regimen', 'relief', 'renewal', 'resilience', 'reverence', 'scent', 'science', 'senses', 'shade', 'sight', 'skin care', 'skin tone', 'skin', 'skin\'s surface', 'smile', 'softness', 'sophistication', 'source', 'spa', 'stunner', 'stupor', 'style', 'substance', 'system', 'technology', 'texture', 'tint', 'tone', 'tool', 'treasure', 'treatment', 'UV rays', 'visual poetry', 'vitality', 'vitamins', 'volume', 'wonder', 'wonderment', 'wow factor'];
const adjectives = ['adorable', 'advanced', 'aesthetic', 'aesthetically pleasing', 'ageless', 'aglow', 'air-whipped', 'all-day', 'all-in-one', 'all-natural', 'alluring', 'angelic', 'anti-aging', 'anti-inflammatory', 'antimicrobial', 'antioxidant-rich', 'antiseptic', 'appealing', 'aromatic', 'artful', 'attractive', 'awe-inspiring', 'beauteous', 'beautiful', 'becoming', 'belle', 'beneficial', 'best', 'bewitching', 'blendable', 'botanical', 'breathtaking', 'brilliant', 'captivating', 'celebrated', 'celestial', 'clarifying', 'classic', 'clean', 'cleansing', 'clump-free', 'color-rich', 'color-true', 'concentrated', 'conditioning', 'consummate', 'continuous', 'contoured', 'convenient', 'cooling', 'coveted', 'creamy', 'crease-resistant', 'cute', 'daily', 'darling', 'dazzling', 'decorative', 'deep', 'deep-cleansing', 'defining', 'delicate', 'dermatologist-recommended', 'dermatologist-tested', 'desirable', 'divine', 'doll-like', 'dramatic', 'dreamy', 'drop-dead gorgeous', 'easily-applied', 'easy on the eyes', 'easy', 'easy-to-apply', 'easy-to-use', 'effective', 'elegant', 'elevated', 'emollient', 'enhancing', 'enriched', 'enriching', 'enticing', 'entrancing', 'enviable', 'errorless', 'essential', 'ethereal', 'even-toned', 'exceptional', 'exclusive', 'exemplary', 'exfoliating', 'exotic', 'exquisite', 'extra', 'facial', 'fade-proof', 'fair', 'fashionable', 'feminine', 'fetching', 'fine', 'fine-looking', 'firm', 'firmer', 'firming', 'flawless', 'formulated', 'foxy', 'fragile', 'fragrance-free', 'fragrant', 'free', 'fresh', 'fresh-faced', 'fuller', 'fuss-free', 'gentle', 'gently', 'glamorous', 'glow-boosting', 'good-looking', 'gorgeous', 'graceful', 'grand', 'hand-milled', 'harmonious', 'head-turning', 'healthy', 'healthy-looking', 'heavenly', 'herbal', 'high definition', 'hot', 'hydrating', 'hypnotic', 'ideal', 'illuminating', 'immediate', 'impeccable', 'innovative', 'inspirational', 'inspiring', 'instantly', 'intense', 'intensified', 'intensive', 'intoxicating', 'invigorating', 'kissable', 'lasting', 'lengthening', 'light', 'lightweight', 'line-diminishing', 'long-lasting', 'long-wearing', 'lovely', 'luminous', 'luscious', 'lush', 'magical', 'magnificent', 'majestic', 'matte', 'medicated', 'medicinal', 'mesmerizing', 'microfine', 'mineral-rich', 'miraculous', 'more even', 'musical', 'must-have', 'natural', 'natural-looking', 'naturally', 'nature\'s', 'no-shine', 'non-greasy', 'nourishing', 'nutritive', 'oil-free', 'oily', 'on-the-go', 'one-of-a-kind', 'ophthalmologist-tested', 'organic', 'outdoor', 'overnight', 'oxidant-rich', 'peaceful', 'perfect', 'perfecting', 'perfectly formed', 'personal', 'photogenic', 'picturesque', 'plant-based', 'plant-powered', 'pleasing', 'plumping', 'powerful', 'prepossessing', 'prescription-strength', 'pretty', 'professional', 'proven', 'pure', 'quick', 'quick-absorbing', 'quick-drying', 'radiance-enhancing', 'radiant', 'ravishing', 'recommended', 'red hot', 'refined', 'refreshed', 'refreshing', 'regenerating', 'rehydrating', 'remarkable', 'renewed', 'replenishing', 'resilient', 'resplendent', 'restorative', 'restructuring', 'revitalizing', 'rich', 'satin-soft', 'scientifically advanced', 'sculptured', 'sensuous', 'sexy', 'sheer', 'shimmering', 'sightly', 'signature', 'silky', 'simple', 'skin cream', 'sleek', 'smear-proof', 'smooth', 'smoothing', 'smudge-free', 'smudge-resistant', 'soft', 'soothing', 'sophisticated', 'spa-inspired', 'sparkling', 'special', 'splendorous', 'statuesque', 'stay-in-place', 'streamlined', 'strengthening', 'striking', 'stunning', 'styling', 'stylish', 'sublime', 'suitable', 'sun-kissed', 'super-enriched', 'superb', 'supple', 'symmetrical', 'taking', 'tasteful', 'tear-free', 'texture', 'therapeutic', 'thicker', 'timeless', 'toned', 'transcendent', 'ultra-conditioning', 'ultra-emollient', 'ultra-fine', 'ultra-light', 'unforgettable', 'unique', 'unusual', 'velvety', 'versatile', 'vibrant', 'visibly', 'volumizing', 'wanted', 'warming', 'waterproof', 'weightless', 'well-formed', 'worry-free', 'younger-looking', 'youth-enhancing', 'youthful'];
const negatives = ['achy', 'acne-prone', 'affected area', 'age', 'buildup', 'cakey', 'chalky', 'chapped', 'cracked', 'creases', 'damage', 'dark circles', 'delicate', 'detergents', 'dirt', 'dirty', 'discoloration', 'drying', 'dryness', 'dull', 'enlarged pores', 'environmental damage', 'exposed', 'exposure', 'fade', 'fading', 'fine lines', 'flaking', 'flat', 'free radicals', 'greasy', 'harsh', 'heat', 'humidity', 'imperfections', 'impurities', 'inflamed', 'irritated', 'irritation', 'itchy', 'lash clumps', 'lined', 'lines', 'mature', 'oil', 'oily', 'old age', 'old', 'outdoors', 'pain', 'pigmented', 'pores', 'processed', 'puffiness', 'puffy', 'runs', 'scarring', 'sensitive', 'shadows', 'shine', 'shriveled', 'signs of aging', 'skin-damaging', 'smear', 'smells', 'smudge', 'splotchy', 'spots', 'sun burn', 'sun damage', 'sun', 'sun-drenched', 'sweaty', 'swelling', 'swollen', 'tight', 'tightness', 'tired skin', 'troubled', 'uneven', 'unruly', 'wears off', 'wind', 'wind-burned'];

const randomReviewSentence = (productName) => {
  // Array of word options
  const wordTypes = [negatives, verbs, objects, adjectives, nouns];
  // The minimum is inclusive and the maximum is exclusive
  const sentenceLength = getRandomIndex(4, 14);
  // Start off with an opening phrase
  const newSentenceArr = [randomElement(opening)];
  for (let i = 0; i < sentenceLength; i += 1) {
    newSentenceArr.push(randomElement(randomElement(wordTypes)));
  }
  // Inject productName twice randomly in each sentence.
  newSentenceArr.splice(getRandomIndex(1, newSentenceArr.length), 0, productName);
  newSentenceArr.splice(getRandomIndex(1, newSentenceArr.length), 0, productName);
  const reviewSentence = `${newSentenceArr.join(' ')}.`;
  return reviewSentence;
};

const randomReviewParagraph = (productName) => {
  let reviewParagraph = '';
  const paragraphLength = getRandomIndex(2, 3);
  for (let i = 0; i < paragraphLength; i += 1) {
    reviewParagraph += `${randomReviewSentence(productName)} `;
  }
  return reviewParagraph;
};

const generateReview = (productName) => {
  let review = '';
  const reviewLength = getRandomIndex(1, 3);
  for (let i = 0; i < reviewLength; i += 1) {
    review += `${randomReviewParagraph(productName)} \n `;
  }
  return review;
};
// console.log(generateReview('makeup'));

module.exports = generateReview;
