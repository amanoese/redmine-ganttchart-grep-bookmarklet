# redmine-ganttchart-grep-bookmarklet

redmineのガントチャート画面で検索を実行出来るようにするブックマークレットです。

![image-gif](https://raw.githubusercontent.com/amanoese/redmine-ganttchart-grep-bookmarklet/images/gant-capture.gif)
## Install
下記のコードをbookmarkletとして登録する

```javascript:bookmaklet
javascript:(function(){ var urls = ['https://amanoese.github.io/redmine-ganttchart-grep-bookmarklet/src/index.js']; urls.forEach((url)=>{ let s = document.createElement('script'); s.src = url; document.head.appendChild(s); }); })();
```

## Usage
1. ガントチャート画面でbookmarkletを実行してくださいてください
2. 表示されるgrep:の検索ボックスにワードを入力する

検索ワードを' '(半角スペース)で区切ることで OR検索ができます。

## License
MIT
