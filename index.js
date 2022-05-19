import Plugin from '@structures/plugin';
import { getByProps } from '@webpack';
import { create } from '@patcher';

const Patcher = create('disable-sticker-suggestions');

const [
   Expressions,
   Stickers
] = getByProps(
   'useStickerSuggestionResults',
   'queryStickers',
   { bulk: true }
);

export default class DisableStickerSuggestions extends Plugin {
   start() {
      Patcher.after(Stickers, 'queryStickers', (_, args, res) => {
         // Check if its the chatbox
         if (args[2]) {
            return { stickers: [] };
         }
      });

      Patcher.instead(Expressions, 'useStickerSuggestionResults', () => []);
   }

   stop() {
      Patcher.unpatchAll();
   }
}