export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'limpieza' | 'hidratacion' | 'tratamiento' | 'styling';
  image: string;
  description: string;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface QuizAnswers {
  hair_type?: string;
  hair_porosity?: string;
  scalp_condition?: string;
  main_concern?: string;
  wash_frequency?: string;
  chemical_treatments?: string;
  budget_range?: string;
  goals?: string;
  name?: string;
  email?: string;
}
