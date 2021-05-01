import { PartOfSpeech } from '@interslavic/steen-utils/dist/types';

export default function verbalizePartOfSpeech(p: PartOfSpeech) {
  let name;
  const annotations = [];

  switch (p.name) {
    case 'adjective':
      name = 'POS_ADJECTIVE';
      break;
    case 'adverb':
      name = 'POS_ADVERB';
      break;
    case 'conjunction':
      name = 'POS_CONJUNCTION';
      break;
    case 'interjection':
      name = 'POS_INTERJECTION';
      break;
    case 'noun':
      name = 'POS_NOUN';
      if (p.animate) annotations.push('POS_NOUN_ANIMATE');
      if (!p.animate) annotations.push('POS_NOUN_INANIMATE');
      if (p.feminine) annotations.push('POS_NOUN_FEMININE');
      if (p.indeclinable) annotations.push('POS_NOUN_INDECLINABLE');
      if (p.masculine) annotations.push('POS_NOUN_MASCULINE');
      if (p.neuter) annotations.push('POS_NOUN_NEUTER');
      if (p.plural) annotations.push('POS_NOUN_PLURAL');
      if (p.singular) annotations.push('POS_NOUN_SINGULAR');
      break;
    case 'numeral':
      name = 'POS_NUMERAL';
      if (p.cardinal) annotations.push('POS_NUMERAL_CARDINAL');
      if (p.collective) annotations.push('POS_NUMERAL_COLLECTIVE');
      if (p.differential) annotations.push('POS_NUMERAL_DIFFERENTIAL');
      if (p.fractional) annotations.push('POS_NUMERAL_FRACTIONAL');
      if (p.multiplicative) annotations.push('POS_NUMERAL_MULTIPLICATIVE');
      if (p.ordinal) annotations.push('POS_NUMERAL_ORDINAL');
      if (p.substantivized) annotations.push('POS_NUMERAL_SUBSTANTIVIZED');
      break;
    case 'particle':
      name = 'POS_PARTICLE';
      break;
    case 'phrase':
      name = 'POS_PHRASE';
      break;
    case 'preposition':
      name = 'POS_PREPOSITION';
      break;
    case 'prefix':
      name = 'POS_PREFIX';
      break;
    case 'pronoun':
      name = 'POS_PRONOUN';
      if (p.demonstrative) annotations.push('POS_PRONOUN_DEMONSTRATIVE');
      if (p.indefinite) annotations.push('POS_PRONOUN_INDEFINITE');
      if (p.intensive) annotations.push('POS_PRONOUN_INTERROGATIVE');
      if (p.personal) annotations.push('POS_PRONOUN_PERSONAL');
      if (p.possessive) annotations.push('POS_PRONOUN_POSSESSIVE');
      if (p.reciprocal) annotations.push('POS_PRONOUN_RECIPROCAL');
      if (p.reflexive) annotations.push('POS_PRONOUN_REFLEXIVE');
      if (p.relative) annotations.push('POS_PRONOUN_RELATIVE');
      break;
    case 'suffix':
      name = 'POS_SUFFIX';
      break;
    case 'verb':
      name = 'POS_VERB';
      if (p.auxiliary) annotations.push('POS_VERB_AUXILIARY');
      if (p.imperfective) annotations.push('POS_VERB_IMPERFECTIVE');
      if (p.intransitive) annotations.push('POS_VERB_INTRANSITIVE');
      if (p.perfective) annotations.push('POS_VERB_PERFECTIVE');
      if (p.reflexive) annotations.push('POS_VERB_REFLEXIVE');
      if (p.transitive) annotations.push('POS_VERB_TRANSITIVE');
      break;
    default:
      throw new Error('Cannot verbalize a part of speech');
  }

  return [name, annotations];
}
