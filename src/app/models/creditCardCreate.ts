export interface CreditCardCreate {
  firstName: string;
  lastName: string;
  cardNumber: string;
  userId: number;
  cvv: number;
  expiryDate: Date;
}
