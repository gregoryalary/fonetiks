import React, { FC, useState } from 'react';

// Types
import { FindPhonemeSettings, PlayedRound } from '../types/find-phoneme.type';

// Components
import FindPhonemeSettingsForm from '../components/FindPhonemeSettingsForm';
import FindPhonemeGame from '../components/FindPhonemeGame';
import FindPhonemeResults from '../components/FindPhonemeGameResults';

enum StateType {
  Settings,
  Playing,
  Result,
}

type State = {
  type: StateType.Settings,
} | {
  type: StateType.Playing,
  settings: FindPhonemeSettings
} | {
  type: StateType.Result,
  playedRounds: PlayedRound[],
};

const FindPhoneme: FC = () => {
  const [state, setState] = useState<State>({ type: StateType.Settings });

  if (state.type === StateType.Settings) {
    return (
      <FindPhonemeSettingsForm
        onSubmit={(settings) => setState({
          type: StateType.Playing,
          settings,
        })}
      />
    );
  }

  if (state.type === StateType.Playing) {
    return (
      <FindPhonemeGame
        settings={state.settings}
        onGameIsEnded={(playedRounds) => setState({
          type: StateType.Result,
          playedRounds,
        })}
      />
    );
  }

  if (state.type === StateType.Result) {
    return (
      <FindPhonemeResults
        playedRounds={state.playedRounds}
        onReplay={() => setState({ type: StateType.Settings })}
      />
    );
  }

  return null;
};

export default FindPhoneme;
