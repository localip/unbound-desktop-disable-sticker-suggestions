import Plugin from '@entities/plugin';

import { findByProps } from '@webpack';

const [
   Expressions,
   Stickers
] = findByProps(
   ['useStickerSuggestionResults'],
   ['queryStickers'],
   { bulk: true }
);

export default class extends Plugin {
   public style: {
      remove: () => void;
   };

   start() {
      this.patcher.after(Stickers, 'queryStickers', (_, [, , isChat], res) => {
         if (isChat) return [];
      });

      this.patcher.instead(Expressions, 'useStickerSuggestionResults', () => []);
   }

   stop() {
      this.style.remove();
      this.patcher.unpatchAll();
   }
}
