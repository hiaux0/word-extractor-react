import { useAtom } from "jotai";
import { ComponentProps, FC, useEffect, useState } from "react";
import { localStorageService } from "@/lib/PersistanceService";
import { wordsDatabaseAtom } from "@/lib/StateAtom";
import { contentScriptCommunicationService } from "@/lib/CommunicationService";

contentScriptCommunicationService.initListeners();

interface PersistanceProps extends ComponentProps<any> {
  children: React.ReactNode;
}

export const PersistanceWrapper: FC<PersistanceProps> = (props) => {
  const { children } = props;
  const [words, setWords] = useAtom(wordsDatabaseAtom);
  const [loaded, setLoaded] = useState(false);
  /*prettier-ignore*/ console.log("[PersistanceWrapper.tsx,17] loaded: ", loaded);

  const isBrowserAction =
    document.getElementById("root")?.dataset.isBrowserAction === "true";

  useEffect(() => {
    if (!loaded) {
      if (words.length === 0) {
        const loadedWords = localStorageService.get();
        contentScriptCommunicationService.send({
          payload: loadedWords,
          action: "database:sync",
        });
        setWords(loadedWords);
      }

      setLoaded(true);
    } else {
      if (isBrowserAction) return;
      localStorageService.set(words);
    }
  }, [words]);

  if (!loaded) return <>Loading...</>;
  return <>{children}</>;
};
