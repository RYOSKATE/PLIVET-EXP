export type Lang = 'ja' | 'en';
export type ProgLang = 'c_cpp' | 'java' | 'python';
export type Theme = 'light' | 'dark';
export type Mode = 'DEMO' | 'EX1' | 'EX2' | 'EX3' | 'EX4';

export interface LangProps extends React.Props<{}> {
  lang: Lang;
}

export interface ProgLangProps extends React.Props<{}> {
  progLang: ProgLang;
}

export interface ThemeProps extends React.Props<{}> {
  theme: Theme;
}

export interface ModeProps extends React.Props<{}> {
  mode: Mode;
}
