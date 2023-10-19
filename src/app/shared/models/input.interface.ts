export interface IInput {
  label: string;
  type: 'text' | 'password' | 'number';
  name: string;
}

export interface IInputRadio {
  title: string;
  options: IRadioOption[];
}

interface IRadioOption {
  id: string;
  title: string;
  name: string;
}
