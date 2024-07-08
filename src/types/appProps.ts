import QuestionItemDTO = API.QuestionItemDTO;

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

interface AppGenerateProps {
  appId: string;
  generateOnSuccess: (result: QuestionItemDTO[]) => void;
}

export { AppProps, AppDetailProps, AppGradeProps, AppGenerateProps };
