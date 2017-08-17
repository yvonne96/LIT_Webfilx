export class Voucher {
  id: number;
  name: string;
  offer: string;
  global: boolean;
  expire: Date;

  constructor(name: string, offer: string, expiry: Date) {}
}
