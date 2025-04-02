// types/user.ts
export interface User {
    _id?: string; // Optional since MongoDB generates this
    email: string;
    password?: string; // Optional in frontend for security
    online: boolean;
    fullName?: string;
    phone?: string;
    messenger?: string;
    profileImage?: string; 
    idNumber?: string;
    country?: string;
    passportNumber?: string;
    passportCountry?: string;
    bankAccount?: string;
    bank?: string;
    bankBookImg?: string;
    idCardImg?: string;
    passSportImg?: string;
    address1?: string;
    address2?: string;
    creditBalance: number;
  }

  export interface EditRequest {
    _id: string;
    user: User;
    fields: Partial<User>;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
  }