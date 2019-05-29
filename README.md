# HelloEdit

HelloEdit is a Markdown editor disguised as a Macintosh Classic-era word processor. It is modelled on Macintosh System 7 and Microsoft Word 5.1.

![HelloEdit screenshot](https://raphaelkabo.com/assets/HelloEdit.png?)

Below the hood HelloEdit is simply an (opinionated) wrapper for [EasyMDE](https://github.com/Ionaru/easy-markdown-editor) by Jeroen Akkerman. The rest of the editor is a small Express app, and files are stored in a simple lowdb database.

## Use online

HelloEdit runs [on my server](https://helloedit.raphaelkabo.com/)! Remember, with great editing power comes great editing responsibility.

## Installing

HelloEdit can be installed and used locally as a personal notebook or text editor. First, clone this repository to a local directory and navigate to it in a terminal, run `npm install`, then run `npm start` whenever you want to run HelloEdit.

## Notes

 Bookmark your important documents in a reliable way! While HelloEdit stores bookmarked documents in LocalStorage, this can easily be cleared by a user when removing history.
