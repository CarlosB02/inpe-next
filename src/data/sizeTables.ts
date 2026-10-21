export interface SizeItem {
  size: string;
  length: string;
  width: string;
}

export interface TableData {
  id: string;
  brand: string;
  model: string;
  data: SizeItem[];
}

export const tablesData: TableData[] = [
  {
    id: 'igor-galochas',
    brand: 'Igor',
    model: 'Galochas',
    data: [
      { size: '20', length: '12,9', width: '5,8' },
      { size: '21', length: '13,5', width: '6,0' },
      { size: '22', length: '14,2', width: '6,2' },
      { size: '23', length: '14,9', width: '6,3' },
      { size: '24', length: '15,5', width: '6,4' },
      { size: '25', length: '16,1', width: '6,5' },
      { size: '26', length: '16,8', width: '6,7' },
      { size: '27', length: '17,5', width: '6,9' },
      { size: '28', length: '18,1', width: '7,0' },
      { size: '29', length: '18,8', width: '7,2' },
      { size: '30', length: '19,5', width: '7,4' },
      { size: '31', length: '20,1', width: '7,5' },
      { size: '32', length: '20,7', width: '7,6' },
      { size: '33', length: '21,3', width: '8,1' },
      { size: '34', length: '22,0', width: '8,3' },
      { size: '35', length: '22,6', width: '8,4' },
    ]
  },
  {
    id: 'igor-lonas',
    brand: 'Igor',
    model: 'Lonas',
    data: [
      { size: '20', length: '13,1', width: '6,0' },
      { size: '21', length: '13,8', width: '6,1' },
      { size: '22', length: '14,4', width: '6,2' },
      { size: '23', length: '15,0', width: '6,4' },
      { size: '24', length: '15,7', width: '6,5' },
      { size: '25', length: '16,4', width: '6,7' },
      { size: '26', length: '17,0', width: '6,9' },
      { size: '27', length: '17,5', width: '7,2' },
      { size: '28', length: '18,1', width: '7,3' },
      { size: '29', length: '18,8', width: '7,4' },
      { size: '30', length: '19,4', width: '7,6' },
    ]
  },
  {
    id: 'igor-nemo',
    brand: 'Igor',
    model: 'Nemo',
    data: [
      { size: '20', length: '12,5', width: '5,9' },
      { size: '21', length: '13,1', width: '6,0' },
      { size: '22', length: '13,7', width: '6,1' },
      { size: '23', length: '14,3', width: '6,2' },
      { size: '24', length: '15,0', width: '6,3' },
      { size: '25', length: '15,7', width: '6,4' },
      { size: '26', length: '16,3', width: '6,6' },
      { size: '27', length: '16,9', width: '6,8' },
      { size: '28', length: '17,6', width: '6,9' },
      { size: '29', length: '18,2', width: '7,0' },
      { size: '30', length: '18,9', width: '7,1' },
      { size: '31', length: '19,6', width: '7,2' },
      { size: '32', length: '20,2', width: '7,4' },
    ]
  },
  {
    id: 'blanditos-modelo-1',
    brand: 'Blanditos',
    model: 'Vénus, Crono, Ares',
    data: [
      { size: '24', length: '15,8', width: '6,7' },
      { size: '25', length: '16,5', width: '6,8' },
      { size: '26', length: '17,2', width: '6,9' },
      { size: '27', length: '17,8', width: '7,1' },
      { size: '28', length: '18,5', width: '7,3' },
      { size: '29', length: '19,1', width: '7,4' },
      { size: '30', length: '19,8', width: '7,6' },
      { size: '31', length: '20,5', width: '7,8' },
      { size: '32', length: '21,1', width: '8,0' },
      { size: '33', length: '21,8', width: '8,1' },
      { size: '34', length: '22,5', width: '8,2' },
      { size: '35', length: '23,3', width: '8,5' },
      { size: '36', length: '23,9', width: '8,6' },
      { size: '37', length: '24,6', width: '8,8' },
      { size: '38', length: '25,0', width: '8,8' },
      { size: '39', length: '25,9', width: '9,0' },
      { size: '40', length: '26,5', width: '9,2' },
    ]
  },
  {
    id: 'blanditos-modelo-2',
    brand: 'Blanditos',
    model: 'Londres, Milán, Módena',
    data: [
      { size: '19', length: '12,1', width: '5,7' },
      { size: '20', length: '12,7', width: '5,8' },
      { size: '21', length: '13,3', width: '5,9' },
      { size: '22', length: '14,0', width: '6,1' },
      { size: '23', length: '14,6', width: '6,2' },
      { size: '24', length: '15,3', width: '6,4' },
      { size: '25', length: '16,0', width: '6,5' },
      { size: '26', length: '16,5', width: '6,7' },
    ]
  },
  {
    id: 'blanditos-modelo-3',
    brand: 'Blanditos',
    model: 'Rio, Marea, Berlim',
    data: [
      { size: '26', length: '16,7', width: '6,8' },
      { size: '27', length: '17,3', width: '6,9' },
      { size: '28', length: '17,9', width: '7,1' },
      { size: '29', length: '18,7', width: '7,3' },
      { size: '30', length: '19,3', width: '7,5' },
      { size: '31', length: '20,0', width: '7,6' },
      { size: '32', length: '20,7', width: '7,8' },
      { size: '33', length: '21,5', width: '8,0' },
      { size: '34', length: '22,1', width: '8,1' },
      { size: '35', length: '22,8', width: '8,2' },
      { size: '36', length: '23,4', width: '8,5' },
      { size: '37', length: '24,0', width: '8,6' },
      { size: '38', length: '24,6', width: '8,8' },
      { size: '39', length: '25,2', width: '8,9' },
      { size: '40', length: '25,9', width: '9,1' },
    ]
  },
  {
    id: 'blanditos-modelo-4',
    brand: 'Blanditos',
    model: 'Coco, Sandía, Fresa, Guinda, Mango',
    data: [
      { size: '20', length: '13,1', width: '5,8' },
      { size: '21', length: '13,7', width: '6,0' },
      { size: '22', length: '14,5', width: '6,1' },
      { size: '23', length: '15,0', width: '6,2' },
      { size: '24', length: '15,8', width: '6,4' },
      { size: '25', length: '16,3', width: '6,5' },
      { size: '26', length: '17,0', width: '6,7' },
      { size: '27', length: '17,6', width: '6,8' },
      { size: '28', length: '18,2', width: '7,0' },
      { size: '29', length: '18,9', width: '7,2' },
    ]
  },
  {
    id: 'platy',
    brand: 'Platy',
    model: 'Platy',
    data: [
      { size: '22', length: '13,4', width: '6,0' },
      { size: '23', length: '14,1', width: '6,3' },
      { size: '24', length: '14,7', width: '6,4' },
      { size: '25', length: '15,3', width: '6,6' },
      { size: '26', length: '16,0', width: '6,8' },
      { size: '27', length: '16,7', width: '7,1' },
      { size: '28', length: '17,4', width: '7,2' },
      { size: '29', length: '18,1', width: '7,4' },
      { size: '30', length: '18,8', width: '7,5' },
    ]
  },
  {
    id: 'lejan-one-kids',
    brand: 'Lejan',
    model: 'One Kids',
    data: [
      { size: '21', length: '13,1', width: '5,7' },
      { size: '22', length: '13,9', width: '5,8' },
      { size: '23', length: '14,3', width: '6,0' },
      { size: '24', length: '15,1', width: '6,3' },
      { size: '25', length: '15,9', width: '6,4' },
      { size: '26', length: '16,4', width: '6,5' },
      { size: '27', length: '17,3', width: '6,6' },
      { size: '28', length: '17,9', width: '6,8' },
      { size: '29', length: '18,5', width: '7,0' },
      { size: '30', length: '19,4', width: '7,2' },
      { size: '31', length: '19,9', width: '7,4' },
      { size: '32', length: '20,6', width: '7,5' },
      { size: '33', length: '21,2', width: '7,7' },
      { size: '34', length: '21,9', width: '7,8' },
      { size: '35', length: '22,6', width: '7,9' },
    ]
  },
  {
    id: 'lejan-one',
    brand: 'Lejan',
    model: 'One',
    data: [
      { size: '36', length: '24,4', width: '8,5' },
      { size: '37', length: '25,0', width: '8,6' },
      { size: '38', length: '25,6', width: '8,8' },
      { size: '39', length: '26,4', width: '9,0' },
      { size: '40', length: '27,2', width: '9,1' },
      { size: '41', length: '27,7', width: '9,2' },
      { size: '42', length: '28,3', width: '9,4' },
      { size: '43', length: '29,0', width: '9,5' },
      { size: '44', length: '29,6', width: '9,7' },
      { size: '45', length: '30,0', width: '9,8' },
      { size: '46', length: '30,6', width: '10' },
    ]
  }
];
