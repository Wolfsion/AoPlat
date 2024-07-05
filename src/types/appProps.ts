interface AppProps {
  app: API.AppVO;
}

interface AppDetailProps {
  appId: string;
}

interface AppGradeProps {
  appId: string;
  updateResult: (result: API.ScoringResultVO) => void;
}

export { AppProps, AppDetailProps, AppGradeProps };
