/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback } from 'react';

// i18n
import { useTranslation } from 'react-i18next';

// Types
import {
  ConsonnantPhoneme, Phoneme, SemiVowelPhoneme, VowelPhoneme,
} from '../../data/types/phoneme.type';

const isOcclusiveConsonnant = (phoneme: Phoneme): phoneme is ConsonnantPhoneme<true> => 'isConsonnant' in phoneme && (phoneme as ConsonnantPhoneme<false>).isOcclusive;
const isNonOcclusiveConsonnant = (phoneme: Phoneme): phoneme is ConsonnantPhoneme<false> => 'isConsonnant' in phoneme && !((phoneme as ConsonnantPhoneme<false>).isOcclusive);
const isVowel = (phoneme: Phoneme): phoneme is VowelPhoneme => 'isVowel' in phoneme;
const isSemiVowel = (phoneme: Phoneme): phoneme is SemiVowelPhoneme => 'isSemiVowel' in phoneme;

const usePhonemeQuestionBuilder = () => {
  const { t } = useTranslation();

  return useCallback((phoneme: Phoneme): string => {
    const parameters = ((phoneme: Phoneme): string[] => {
      if (isOcclusiveConsonnant(phoneme)) {
        return [
          `phoneme.parameters.isVoiced.${phoneme.isVoiced ? 'true' : 'false'}`,
          `phoneme.parameters.isOcclusive.${phoneme.isOcclusive ? 'true' : 'false'}`,
          `phoneme.parameters.consonnantArticulationPlace.${phoneme.consonnantArticulationPlace}`,
          `phoneme.parameters.isNazalised.${phoneme.isNazalised ? 'true' : 'false'}`,
        ];
      }

      if (isNonOcclusiveConsonnant(phoneme)) {
        return [
          `phoneme.parameters.isVoiced.${phoneme.isVoiced ? 'true' : 'false'}`,
          `phoneme.parameters.isOcclusive.${phoneme.isOcclusive ? 'true' : 'false'}`,
          `phoneme.parameters.consonnantArticulationPlace.${phoneme.consonnantArticulationPlace}`,
          `phoneme.parameters.isLabialased.${phoneme.isLabialased ? 'true' : 'false'}`,
        ];
      }

      if (isVowel(phoneme)) {
        return [
          `phoneme.parameters.aperture.${phoneme.aperture}`,
          `phoneme.parameters.articulationPlaceIsPosterior.${phoneme.articulationPlaceIsPosterior ? 'true' : 'false'}`,
          `phoneme.parameters.isLabialased.${phoneme.isLabialased ? 'true' : 'false'}`,
          `phoneme.parameters.isNazalised.${phoneme.isNazalised ? 'true' : 'false'}`,
        ];
      }

      if (isSemiVowel(phoneme)) {
        return [
          `phoneme.parameters.isOcclusive.${phoneme.isOcclusive ? 'true' : 'false'}`,
          `phoneme.parameters.consonnantArticulationPlace.${phoneme.semiVowelArticulationPlace}`,
          `phoneme.parameters.isLabialased.${phoneme.isLabialased ? 'true' : 'false'}`,
        ];
      }

      return [];
    })(phoneme);

    return [
      t('phoneme.question_prefix'),
      parameters.map((key) => t(key)).join(', '),
      t('phoneme.question_suffix'),
    ].join(' ');
  }, [t]);
};

export default usePhonemeQuestionBuilder;
