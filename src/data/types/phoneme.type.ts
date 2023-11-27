export interface Phoneme {
  symbol: string
}

export enum ConsonnantArticulationPlace {
  Bilabial = 'bilabial',
  ApicoAlveodental = 'apico_alveodental',
  DorsoPalatal = 'dorso_palatal',
  DorsoVelaire = 'dorso_velaire',
  LabioDental = 'labio_dental',
  PreDorsoAleveloaire = 'pre_dorso_alvoelaire',
  PostAlveolaire = 'post_alvoelaire',
  ApicoAlveolaire = 'apico_alvoelaire',
  DorsoUvulaire = 'dorso_uvulaire',
}

export interface ConsonnantPhoneme<IsOcclusive extends Boolean> extends Phoneme {
  isConsonnant: true
  isOcclusive: IsOcclusive
  consonnantArticulationPlace: ConsonnantArticulationPlace,
  isVoiced: boolean,
  isNazalised: IsOcclusive extends true ? boolean : undefined,
  isLabialased: IsOcclusive extends true ? undefined : boolean,
}

export enum VowelAperture {
  Closed = 'closed',
  SemiClosed = 'semi_closed',
  Opened = 'opened',
  SemiOpened = 'semi_opened',
}

export interface VowelPhoneme extends Phoneme {
  isVowel: true
  aperture: VowelAperture,
  articulationPlaceIsPosterior: boolean,
  isLabialased: boolean,
  isNazalised: boolean
}

export enum SemiVowelArticulationPlace {
  DorsoPalatal = 'dorso_palatal',
  DorsoVelaire = 'dorso_velaire',
}

export interface SemiVowelPhoneme extends Phoneme {
  isSemiVowel: true
  isOcclusive: false
  semiVowelArticulationPlace: SemiVowelArticulationPlace
  isLabialased: boolean
}

export interface PhonemeCollection {
  consonnants: ConsonnantPhoneme<boolean>[]
  vowels: VowelPhoneme[]
  // semiVowels: SemiVowelPhoneme[]
}
