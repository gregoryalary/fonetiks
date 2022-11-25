import React, { FC, useMemo } from 'react';

// Formik / Yup
import { Formik } from 'formik';
import * as yup from 'yup';

// MUI
import {
  Box, Button, Checkbox, FormControl, FormControlLabel,
  FormGroup, FormHelperText, FormLabel, Grid, Slider, TextField,
} from '@mui/material';

// i18n
import { useTranslation } from 'react-i18next';

// Types
import { FindPhonemeSettings } from '../types/find-phoneme.type';

const DEFAULT_VALUES: FindPhonemeSettings = {
  round: 10,
  include: {
    consonant: true,
    vowel: true,
    semiVowel: true,
  },
};

type Props = {
  onSubmit: (settings: FindPhonemeSettings) => any
};

const FindPhonemeSettingsForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const validationSchema = useMemo(() => yup.object({
    round: yup.number().required().min(1).max(50),
    include: yup.object().shape({
      vowel: yup.bool().when(['consonant', 'semiVowel'], {
        is: (consonant: boolean, semiVowel: boolean) => !consonant && !semiVowel,
        then: yup.bool().isTrue(),
      }),
      consonant: yup.bool().when(['vowel', 'semiVowel'], {
        is: (vowel: boolean, semiVowel: boolean) => !vowel && !semiVowel,
        then: yup.bool().isTrue(),
      }),
      semiVowel: yup.bool().when(['vowel', 'consonant'], {
        is: (vowel: boolean, consonant: boolean) => !vowel && !consonant,
        then: yup.bool().isTrue(),
      }),
    }, [['vowel', 'consonant'], ['vowel', 'semiVowel'], ['consonant', 'semiVowel']]),
  }), []);

  return (
    <Formik<FindPhonemeSettings>
      initialValues={DEFAULT_VALUES}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        errors,
        values,
        setValues,
        handleChange,
        handleBlur,
        submitForm,
      }) => (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl sx={{ mb: 2 }} error={!!errors.round}>
            <FormLabel>
              {t('find_phoneme.settings.round')}
            </FormLabel>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  error={!!errors.round}
                  value={values.round}
                  name="round"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    min: 1,
                    max: 36,
                    type: 'number',
                  }}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Slider
                  color="primary"
                  valueLabelDisplay="auto"
                  value={values.round}
                  min={1}
                  max={50}
                  onChange={(_, value) => setValues({ ...values, round: value as number })}
                />
              </Grid>
            </Grid>
            {errors.round && (<FormHelperText>{t('find_phoneme.settings.form.round.error', { min: 1, max: 50 })}</FormHelperText>)}
          </FormControl>

          <FormControl sx={{ mb: 2 }} error={!!errors.include}>
            <FormLabel>
              {t('find_phoneme.settings.form.include.name')}
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={(
                  <Checkbox
                    name="include.consonant"
                    onChange={handleChange}
                    value={values.include.consonant}
                    defaultChecked
                  />
                )}
                label={t('find_phoneme.settings.include.consonant')}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    name="include.vowel"
                    onChange={handleChange}
                    value={values.include.vowel}
                    defaultChecked
                  />
                )}
                label={t('find_phoneme.settings.include.vowel')}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    name="include.semiVowel"
                    onChange={handleChange}
                    value={values.include.semiVowel}
                    defaultChecked
                  />
                )}
                label={t('find_phoneme.settings.include.semi_vowel')}
              />
              {errors.include && (<FormHelperText>{t('find_phoneme.settings.form.include.error')}</FormHelperText>)}
            </FormGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="contained" onClick={submitForm}>
              C&apos;est parti !
            </Button>
          </Box>

        </Box>
      )}
    </Formik>
  );
};

export default FindPhonemeSettingsForm;
