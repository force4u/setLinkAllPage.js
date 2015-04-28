//
//setLinkAllPage.js
//20140812 v1.1
//ダイアログで入力されたURLを
//全てのページへリンクオブジェクトとして付加します
//Detected linksに対応
//Arobat 11 OSX 10.6.8 にて確認
//インストール先は
//ディスク名/Users/ユーザー名/Library/Application Support/Adobe/Acrobat/11.0/JavaScripts
//文字コード　UTF-16　改行コードUNIX　に変更してから配置

//処理部
function setLinkAllPage(){
//まずはコンソール（デバッガー）を出さないと
//結果が見れませんので出しておきます
console.show();
//URL入力用のダイアログ
var strResponse = app.response({
		cQuestion: "リンクオブジェクト用のURLを入力",
		cTitle: "URLを入力してください",
		cDefault: "http://",
		cLabel:"入力:"
		});
//デバッグ用のコンソールログ
console.println(strResponse);
//ダイアログの戻り値がnullなら処理を中止
if (strResponse == null){
 exit;
}
//繰り返しのはじまり
for ( var i=0; i < this.numPages; i++)
	{
//Cropサイズを取得
var cropBox = this.getPageBox("Crop",i);
//デバッグ用のコンソールログ
console.println('cropBox: ' + cropBox + ' ');
//rectの４つの値をそれぞれに分ける
var numXll = cropBox[0];
var numYll = cropBox[1];
var numXur = cropBox[2];
var numYrl = cropBox[3];
//少数点以下を切り捨て
var numXll = Math.floor(numXll);
var numYll = Math.floor(numYll);
var numXur = Math.floor(numXur);
var numYrl = Math.floor(numYrl);
//デバッグ用のコンソールログ
console.println('numXll: ' + numXll + ' ');
console.println('numYll: ' + numYll + ' ');
console.println('numXur: ' + numXur + ' ');
console.println('numYrl: ' + numYrl + ' ');
//幅
var linkWidth = numXur;
//高さ
var linkHeight = numYll;
//並び替えてリンクオブジェクトのサイズにする
var linkRect1 = [0,linkHeight,linkWidth,0];
//↑ここはお好みで↓このように設定しても良いですね（左下にリンク部）
//var linkRect1 = [0,100,320,0];
//リンクオブジェクトを作成
var lhLink = this.addLink(i, linkRect1);
//リンクオブジェトにリンクを設定
lhLink.setAction("app.launchURL('" + strResponse + "');");



//ボーダーカラーは白
//lhLink.borderColor = color.white;
//デモ用の赤ボーダー
lhLink.borderColor = color.red;
//ボーダー幅は１px
lhLink.borderWidth = 1;
//繰り返しの終わり
}
//処理の終わり
}



//拡張メニュー本体
app.addToolButton({
cName: "setLinkAllPage",
cParent: "Annots",
cExec: "setLinkAllPage()",
cEnable: "event.rc = true",
cMarked: "event.rc = false",
cTooltext: "リンクを全ページに付加します",
nPos: -1,
cLabel: "setLinkAllPage"

});

