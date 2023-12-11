export interface IUsuario {
  Id?: number;
  DNI?: string;
  Nombre?: string;
  Apellido?: string;
  Usuario: string;
  Password: string;
  Habilitado?: boolean;
  Surcursal?: string;
}


// private usuarios: IUsuario[] = [
//   { user: 'AV', password: '1234' },
//   { user: 'R20', password: '1234' },
//   { user: 'SV', password: '1234' },
//   { user: 'CVL', password: '1234' },
//   { user: 'SAL', password: '1234' },
//   { user: '60C', password: '1234' },
//   { user: 'AG', password: '1234' },
//   { user: 'TLH', password: '1234' },
//   { user: 'TSM', password: '1234' },
//   { user: 'COC', password: '1234' },
//   { user: 'csosa', password: '1234' },
//   { user: 'momolina', password: '1234' },
//   { user: 'mcastillo', password: '1234' },
//   { user: 'lmartini', password: '1234' },
//   { user: 'rbuttiero', password: '1234' },
//   { user: 'murriche', password: '1234' },
//   { user: 'jrojas', password: '1234' },
//   { user: 'potro', password: '1234' },
//   { user: 'ehuanco', password: 'huanco28' },
//   { user: 'ebarrera', password: '1234' },
//   { user: 'mchavez', password: '1234' },
//   { user: 'pmarino', password: '1234' },
//   { user: 'gtevez', password: '1234' },
// ];