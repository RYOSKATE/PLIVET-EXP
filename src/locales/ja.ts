// tslint:disable:max-line-length
export default {
  howToUse: '使い方',
  close: '閉じる',
  debugStart: '現在のプログラムで再ステップ実行',
  debugStop: '実行終了',
  debugBackAll: '実行中のプログラムを最初のステップに戻す',
  debugStepBack: '実行中のプログラムを1ステップ戻す',
  debugStep: 'プログラムを1ステップ実行する',
  debugStepAll: 'プログラムを最後まで実行する',
  changeThemedark: 'ダークテーマに切り替える',
  changeThemelight: 'ライトテーマに切り替える',
  zoomOut: 'エディタのフォントサイズを小さくする',
  zoomIn: 'エディタのフォントサイズを大きくする',
  zoomReset: 'エディタのフォントサイズをリセットする',
  howToText: [
    '下のエディタにプログラムを書き、上のボタンを押すことで可視化実行ができます。',
    '(マウスカーソルを重ねるとで各ボタンの説明が表示されます。)'
  ],
  uploadFile: 'アップロードされたファイルはここに表示されます。',
  warning: '警告!',
  editInDebug: `実行中のソースコードが編集されました。
プログラムの挙動には反映されませんが、
コードのハイライトが等がずれる恐れがあります。`,
  continueDebug: '続行',
  restart: '再実行',
  rememberCommand: 'この選択を記憶する',
  sourceCodeCcpp: String.raw`#include<stdio.h>
int recursiveToThree(int n){
  printf("%d th\n", n + 1);
  if(n < 3){
    int r = recursiveToThree(n + 1);
    n = r;
  }
  return n;
}
int main(){
  int n = 0;//変数定義

  n = recursiveToThree(0);//再帰関数呼出

  int arr[5] = {1, 2, 3};//配列変数

  int* ptr = &arr[2];//ポインタ変数
  *ptr = 5;

  //動的メモリ確保
  int* d_arry = malloc(sizeof(int) * 3);

  //二次元ポインタ配列の動的メモリ配列
  int* pd_arr[2];
  pd_arr[0] = malloc(sizeof(int) * 2);
  pd_arr[1] = malloc(sizeof(int) * 2);

  free(pd_arr[0]);//メモリの解放

  printf("Hello,world!\n");//標準出力

  //ファイル出力
  {
    FILE* fp=NULL;
    fp = fopen("PLIVET.txt", "w");
    fputs("PLIVET", fp);
    fclose(fp);
  }

  //ファイル入力
  {
    FILE* fp=NULL;
    char buf[7];
    fp = fopen("PLIVET.txt", "r");
    while(fgets(buf,10,fp) != NULL) {
      printf("%s",buf);
    }
    fclose(fp);
  }

  return 0;
}`,
  sourceCodeJava: String.raw`import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    while (true) {
      int n = sc.nextInt();
      int r = sc.nextInt();
      if (n == 0) {
        break;
      }
      int[] a = new int[n];
      int[] b = new int[n];
      for (int i = 0; i < n; i++) {
        a[i] = n - i;
      }
      for (int i = 0; i < r; i++) {
        int p = sc.nextInt();
        int c = sc.nextInt();
        p--;
        for (int j = 0; j < c; j++) {
          b[j] = a[p + j];
        }
        for (int j = 0; j < p; j++) {
          b[c + j] = a[j];
        }
        for (int j = 0; j < p + c; j++) {
          a[j] = b[j];
        }
      }
      System.out.println(a[0]);
    }
  }
}`,
  sourceCodePython: String.raw`while True:
  n, r = map(int, input().split())
  if n == 0:
    break
  a = [0] * n
  b = [0] * n
  for i in range(n):
    a[i] = b[i] = n - i
  for i in range(r):
    p, c = map(int, input().split())
    p = p - 1
    for j in range(c):
      b[j] = a[p + j]
    for j in range(p):
      b[c + j] = a[j]
    for j in range(p + c):
      a[j] = b[j]
  print(a[0])
`,
  DEMO: String.raw`#include<stdio.h>
int recursiveToThree(int n){
    printf("%d times\n", n + 1);
    if(n < 3){
        int r = recursiveToThree(n + 1);
        n = r;
    }
    return n;
}
int main(){
    int n = 0;//変数宣言の例

    n = recursiveToThree(0);//再帰関数呼び出しの例

    int arr[5] = {1, 2, 3};//配列変数の例

    int* ptr = &arr[2];//ポインタ変数の例
    *ptr = 5;

    //メモリの動的確保の例
    int* d_arry = malloc(sizeof(int) * 3);

    //動的な2次元配列の例
    int* pd_arr[2];
    pd_arr[0] = malloc(sizeof(int) * 2);
    pd_arr[1] = malloc(sizeof(int) * 2);

    printf("Hello,world!\n");//標準出力の例

    //メモリリークの例
    free(pd_arr[0]);
    return 0;
}`,
  EX1: String.raw`void swap1(int* x, int* y){
  int s = *x;
  if(s<2){
      *x = *y;
      *y = s;
  }
}
void swap2(int *z, int *w){
  int t = *z;
  if(t<3){
      *z = *w;
      *w = t;
  }
}
void swap3(int *w, int *o){
  int u = *w;
  if(u<4){
      *w = *o;
      *o = u;
  }else{
      *o = 6;
      swap1(o,w);
  }
}
int main()
{
  int a = 1, b = 2, c = 3, d = 4, e = 5;
  swap1(&a,&b);
  swap3(&a,&c);
  swap2(&e,&b);
  swap3(&d,&e);
  swap2(&b,&c);
  swap1(&a,&d);
  return 0;
}`,
  EX2: String.raw`#include<stdio.h>
int f(int* pn){
    int n = (*pn);
    int r = 1;
    if(1<=n){
        (*pn) = n - 1;
        r = n * f(pn);
    }
    return r;
}
int main()
{
    int n = 4;
    int r = f(&n);
    return 0;
}`,
  EX3: String.raw`#include<stdio.h>
int main()
{
    int i,j,n=3;
    int*ps[3];
    for(i=0; i<n; ++i){
        ps[i]=malloc(sizeof(int)*n);
        for(j=0; j<n; ++j){
            ps[i][j]=i*i + j*j;
        }
    }
    for(i=0; i<n; ++i){
        if(ps[i][2]%2==0)
            free(ps[i]);
    }
    return 0;
}`,
  EX4: String.raw`#include<stdio.h>
int H(int n,char a,char b,char c)
{
    if(n>=2){
        H(n-1,a,c,b);
    }

    if(n>=2){
        H(n-1,b,a,c);
    }
    return n;
}

int main()
{
    H(4,'A','B','C');
    return 0;
}`,
  message1: String.raw`1. 初めに<a href="https://github.com/RYOSKATE/PLIVET-EXP/wiki/PLIVET使い方" target="_blank">PLIVETの使い方</a>を確認してください。
2. このDEMOページで操作方法や可視化方法を確認してください。
3. 確認後、実験用問題をEX1,EX2,EX3,EX4の順番で解答してください。
　上部のボタンを押すことで、問題を切り替えることができます。
4. 各実験問題は"正解/不正解"と"所要時間"が報告対象です。
　自身の実験結果ファイルに記入してください。
5. EX4の結果記入後は、上部の[回答終了]ボタンを押し、
　ログファイルをダウンロード/保存をしてください。`,
  prepare: String.raw`録画を開始してください。
以下の説明を読み終えた後に[実験開始]ボタンを押してください。
1. [実験開始]ボタンを押すと問題文とプログラムが表示されます。
2. 自由にプログラムを実行し、可視化結果を参考に解答してください。
3. 答えがわかったら実験記録ファイルに答えをメモし、
　[答えを確認]ボタンを押してください。
4. 実験結果ファイルに[正解/不正解]と[経過時間]を記入し、
　次の問題に進んでください。
・経過時間は[実験開始]ボタンを押すと表示されます。
・この実験ではソースコードの編集はしないでください。
・エディタが画面に収まっていない場合は、
　ブラウザの全画面表示や縮小表示を推奨します。
(この開始前説明文は全ての問題ページで共通です。)`,

  EX1Q: String.raw`EX1:ポインタ渡し関数の問題です。
以下のプログラムを実行したとき
最終的なa,b,c,d,eの値は？(回答例:a=1,b=2,c=3,d=4,e=5)`,
  EX2Q: String.raw`EX2:階乗を計算する関数の問題です。
以下のプログラムを実行したとき
関数fが3度目にreturnするときのrと
そのときのn,(*pn)の表す値は？(回答例:n=1,r=2,(*pn)=3)`,
  EX3Q: String.raw`EX3:メモリの動的確保の問題です。
以下のプログラムを実行したときmain関数がreturnする時点で
ヒープ領域に未開放のメモリ領域があれば
そのメモリを参照する変数とそれらのメモリ上の値は何か？
(回答例:ps[0]={1,2,3},ps[3]={0,3,2})`,
  EX4Q: String.raw`EX4:再帰関数の問題です。
以下のプログラムを実行したとき
最初にn=1, a='B', b='A', c='C'
となるのは関数Hが何回呼ばれたときか？(回答例:10回目)`,
  EX1A: 'a=3,b=2,c=1,d=4,e=6',
  EX2A: 'n=2,r=2,(*pn)=0',
  EX3A: 'ps[1]={1,2,5}',
  EX4A: '5回目'
};
