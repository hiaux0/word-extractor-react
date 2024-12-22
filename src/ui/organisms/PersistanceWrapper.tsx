import { useAtom } from "jotai";
import { ComponentProps, FC, useEffect, useState } from "react";
import { localStorageService } from "@/lib/PersistanceService";
import { wordsDatabaseAtom } from "@/lib/StateAtom";
import { contentScriptCommunicationService } from "@/lib/CommunicationService";
import { MESSAGES } from "@/lib/common/constants";

interface PersistanceProps extends ComponentProps<any> {
  children: React.ReactNode;
}

export const PersistanceWrapper: FC<PersistanceProps> = (props) => {
  const { children } = props;
  const [words, setWords] = useAtom(wordsDatabaseAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    /*prettier-ignore*/ console.log("-------------------------------------------------------------------");
    if (!loaded) {
      if (words.length === 0) {
        const loadedWords = localStorageService.get();
        /*prettier-ignore*/ console.log("1. [PersistanceWrapper.tsx,21] loadedWords: ", loadedWords);
        contentScriptCommunicationService.send({
          payload: loadedWords,
          action: MESSAGES["database:sync"],
        });
        setWords(loadedWords);
      }

      setLoaded(true);
    } else {
      console.log("[PersistanceWrapper.tsx,21] words: ", words);
      localStorageService.set(words);
    }
  }, [words]);

  if (!loaded) return <>Loading...</>;
  return <>{children}</>;
};
