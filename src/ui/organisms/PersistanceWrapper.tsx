import { useAtom } from "jotai";
import { ComponentProps, FC, useEffect, useState } from "react";
import { localStorageService } from "@/lib/PersistanceService";
import { wordsDatabaseAtom } from "@/lib/StateAtom";
import { contentScriptCommunicationService } from "@/lib/CommunicationService";
import { MESSAGES } from "@/lib/common/constants";

contentScriptCommunicationService.initListeners();

interface PersistanceProps extends ComponentProps<any> {
  children: React.ReactNode;
}

export const PersistanceWrapper: FC<PersistanceProps> = (props) => {
  const { children } = props;
  const [words, setWords] = useAtom(wordsDatabaseAtom);
  const [loaded, setLoaded] = useState(false);
  /*prettier-ignore*/ console.log("[B][C] [PersistanceWrapper.tsx,17] loaded: ", loaded);

  const isBrowserAction =
    document.getElementById("root")?.dataset.isBrowserAction === "true";

  useEffect(() => {
    if (!loaded) {
      if (words.length === 0) {
        if (isBrowserAction) return setLoaded(true);
        const loadedWords = localStorageService.get();
        /*prettier-ignore*/ console.log("[ ][C] Loaded words from localStorage", loadedWords);
        if (loadedWords.length === 0) return setLoaded(true);
        /*prettier-ignore*/ console.log("[ ][C] Sending loaded words to [CS] from [PW]");
        contentScriptCommunicationService.send({
          payload: loadedWords,
          action: MESSAGES["database:sync"],
        });
        setWords(loadedWords);
      }

      setLoaded(true);
    } else {
      if (isBrowserAction) return setLoaded(true);
      /*prettier-ignore*/ console.log("[ ][C] Setting words to localStorage", words);
      localStorageService.set(words);
      contentScriptCommunicationService.send({
        payload: words,
        action: MESSAGES["database:sync"],
      });
      setLoaded(true);
    }
  }, [words]);

  if (!loaded) return <>Loading...</>;
  return <>{children}</>;
};
