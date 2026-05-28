export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  category: 'limpieza' | 'hidratacion-nutricion' | 'tratamiento' | 'crecimiento';
  image: string;
  description: string;
  fullDescription?: string;
  benefits?: string[];
  idealFor?: string;
  ingredients?: { name: string; benefit: string }[];
  usage?: string;
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
