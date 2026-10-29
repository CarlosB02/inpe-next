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

  // 1. BLANDITOS — Londres, Lisboa, Atenas, Caicos, Bahamas, Azores, Cairo, Maui, Lima, Ottawa, Doha, Pekín, Kyoto e Zürich
  {
    id: 'blanditos-londres-lisboa-atenas',
    brand: 'Blanditos',
    model: 'Londres, Lisboa, Atenas, Caicos, Bahamas, Azores, Cairo, Maui, Lima, Ottawa, Doha, Pekín, Kyoto, Zürich',
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

  // 2. BLANDITOS — Torino, Porto y Riga
  {
    id: 'blanditos-torino-porto-riga',
    brand: 'Blanditos',
    model: 'Torino, Porto, Riga',
    data: [
      { size: '21', length: '13,3', width: '5,9' },
      { size: '22', length: '14,0', width: '6,1' },
      { size: '23', length: '14,6', width: '6,2' },
      { size: '24', length: '15,3', width: '6,4' },
      { size: '25', length: '16,0', width: '6,5' },
      { size: '26', length: '16,5', width: '6,7' },
      { size: '27', length: '17,3', width: '7,2' },
    ]
  },

  // 3. BLANDITOS — Dallas, Quito, Delhi, Troya
  {
    id: 'blanditos-dallas-quito-delhi-troya',
    brand: 'Blanditos',
    model: 'Dallas, Quito, Delhi, Troya',
    data: [
      { size: '19', length: '12,1', width: '5,7' },
      { size: '20', length: '12,7', width: '5,8' },
      { size: '21', length: '13,3', width: '5,9' },
      { size: '22', length: '14,0', width: '6,1' },
      { size: '23', length: '14,6', width: '6,2' },
      { size: '24', length: '15,3', width: '6,4' },
      { size: '25', length: '16,0', width: '6,5' },
      { size: '26', length: '16,5', width: '6,7' },
      { size: '27', length: '17,3', width: '7,2' },
    ]
  },

  // 4. BLANDITOS — Río, Delfín, Kauai, Borneo, Imola, Etna, Génova, Alaska, Chicago, Aspen, Boreal, Bristol, Dakar, Hielo, Quebec, Hadas
  {
    id: 'blanditos-rio-delfin-kauai',
    brand: 'Blanditos',
    model: 'Río, Delfín, Kauai, Borneo, Imola, Etna, Génova, Alaska, Chicago, Aspen, Boreal, Bristol, Dakar, Hielo, Quebec, Hadas',
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

  // 5. BLANDITOS — Ballet, Eclat, Florencia
  {
    id: 'blanditos-ballet-eclat-florencia',
    brand: 'Blanditos',
    model: 'Ballet, Eclat, Florencia',
    data: [
      { size: '26', length: '17,0', width: '6,7' },
      { size: '27', length: '17,7', width: '6,8' },
      { size: '28', length: '18,1', width: '7,0' },
      { size: '29', length: '19,0', width: '7,0' },
      { size: '30', length: '19,6', width: '7,2' },
      { size: '31', length: '20,3', width: '7,5' },
      { size: '32', length: '21,0', width: '7,6' },
      { size: '33', length: '21,5', width: '7,8' },
      { size: '34', length: '22,2', width: '8,0' },
      { size: '35', length: '22,9', width: '8,1' },
      { size: '36', length: '23,5', width: '8,2' },
      { size: '37', length: '24,1', width: '8,4' },
      { size: '38', length: '24,8', width: '8,6' },
      { size: '39', length: '25,4', width: '8,8' },
      { size: '40', length: '26,0', width: '9,0' },
      { size: '41', length: '26,6', width: '9,1' },
      { size: '42', length: '27,3', width: '9,3' },
    ]
  },

  // 6. BLANDITOS — Ares, Aquiles, Poseidón
  {
    id: 'blanditos-ares-aquiles-poseidon',
    brand: 'Blanditos',
    model: 'Ares, Aquiles, Poseidón',
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

  // 7. BLANDITOS — Heray, Apolo (À prova de água)
  {
    id: 'blanditos-heray-apolo',
    brand: 'Blanditos',
    model: 'Heray, Apolo (À prova de água)',
    data: [
      { size: '24', length: '15,8', width: '6,4' },
      { size: '25', length: '16,4', width: '6,4' },
      { size: '26', length: '17', width: '6,5' },
      { size: '27', length: '17,5', width: '6,7' },
      { size: '28', length: '18,2', width: '7' },
      { size: '29', length: '19', width: '7,2' },
      { size: '30', length: '19,4', width: '7,2' },
      { size: '31', length: '20,2', width: '7,5' },
      { size: '32', length: '20,8', width: '7,7' },
      { size: '33', length: '21,5', width: '7,7' },
      { size: '34', length: '22', width: '7,9' },
      { size: '35', length: '22,8', width: '8,3' },
      { size: '36', length: '23,4', width: '8,4' },
      { size: '37', length: '24', width: '8,4' },
      { size: '38', length: '24,8', width: '8,7' },
      { size: '39', length: '25,5', width: '9' },
      { size: '40', length: '26', width: '9,1' },
    ]
  },

  // 8. BLANDITOS — Chiclid, Guppy, Platy, Xhipo
  {
    id: 'blanditos-chiclid-guppy-platy-xhipo',
    brand: 'Blanditos',
    model: 'Chiclid, Guppy, Platy, Xhipo',
    data: [
      { size: '22', length: '13,4', width: '6,0' },
      { size: '23', length: '14,1', width: '6,3' },
      { size: '24', length: '14,7', width: '6,4' },
      { size: '25', length: '15,3', width: '6,6' },
      { size: '26', length: '16', width: '6,8' },
      { size: '27', length: '16,7', width: '7,1' },
      { size: '28', length: '17,4', width: '7,2' },
      { size: '29', length: '18,1', width: '7,4' },
      { size: '30', length: '18,8', width: '7,5' },
    ]
  },

  // 9. BLANDITOS — Aneto, Heracles, Hércules y Ulises
  {
    id: 'blanditos-aneto-heracles-hercules-ulises',
    brand: 'Blanditos',
    model: 'Aneto, Heracles, Hércules, Ulises',
    data: [
      { size: '28', length: '18,0', width: '7,6' },
      { size: '29', length: '18,7', width: '7,7' },
      { size: '30', length: '19,4', width: '7,8' },
      { size: '31', length: '20,01', width: '8,0' },
      { size: '32', length: '20,09', width: '8,2' },
      { size: '33', length: '21,6', width: '8,4' },
      { size: '34', length: '22,2', width: '8,6' },
      { size: '35', length: '22,8', width: '8,6' },
      { size: '36', length: '23,5', width: '8,8' },
      { size: '37', length: '24,3', width: '9,0' },
      { size: '38', length: '24,8', width: '9,1' },
      { size: '39', length: '25,6', width: '9,3' },
      { size: '40', length: '26,2', width: '9,5' },
    ]
  },

  // 10. BLANDITOS — Zeus
  {
    id: 'blanditos-zeus',
    brand: 'Blanditos',
    model: 'Zeus',
    data: [
      { size: '20', length: '13,2', width: '5,8' },
      { size: '21', length: '13,8', width: '6,0' },
      { size: '22', length: '14,4', width: '6,2' },
      { size: '23', length: '15,1', width: '6,3' },
      { size: '24', length: '15,8', width: '6,4' },
      { size: '25', length: '16,5', width: '6,5' },
      { size: '26', length: '17,1', width: '6,7' },
      { size: '27', length: '17,7', width: '6,8' },
      { size: '28', length: '18,3', width: '6,9' },
      { size: '29', length: '19,0', width: '7,2' },
    ]
  },

  // IGOR
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
    id: 'igor-homie-pana',
    brand: 'Igor',
    model: 'Homie Pana (Pantufa)',
    data: [
      { size: '20', length: '12', width: '' },
      { size: '21', length: '13', width: '' },
      { size: '22', length: '13,5', width: '' },
      { size: '23', length: '14,5', width: '' },
      { size: '24', length: '15', width: '' },
      { size: '25', length: '15,5', width: '' },
      { size: '26', length: '16', width: '' },
      { size: '27', length: '17', width: '' },
    ]
  },
  {
    id: 'igor-tennis',
    brand: 'Igor',
    model: 'Tennis',
    data: [
      { size: '20', length: '12,5', width: '' },
      { size: '21', length: '13', width: '' },
      { size: '22', length: '13,5', width: '' },
      { size: '23', length: '14,5', width: '' },
      { size: '24', length: '15', width: '' },
      { size: '25', length: '16', width: '' },
      { size: '26', length: '16,5', width: '' },
      { size: '27', length: '17', width: '' },
      { size: '28', length: '18', width: '' },
      { size: '29', length: '18,5', width: '' },
      { size: '30', length: '19', width: '' },
      { size: '31', length: '19,5', width: '' },
      { size: '32', length: '20', width: '' },
    ]
  },
  {
    id: 'igor-tennis-suede',
    brand: 'Igor',
    model: 'Ténis Suede',
    data: [
      { size: '20', length: '12', width: '' },
      { size: '21', length: '13', width: '' },
      { size: '22', length: '13,5', width: '' },
      { size: '23', length: '14', width: '' },
      { size: '24', length: '15', width: '' },
      { size: '25', length: '15,5', width: '' },
      { size: '26', length: '16', width: '' },
      { size: '27', length: '17', width: '' },
      { size: '28', length: '17,5', width: '' },
      { size: '29', length: '18,5', width: '' },
      { size: '30', length: '19', width: '' },
      { size: '31', length: '19,5', width: '' },
      { size: '32', length: '20,5', width: '' },
    ]
  },
  {
    id: 'igor-malibu',
    brand: 'Igor',
    model: 'Malibu (Sandálias)',
    data: [
      { size: '22', length: '13,5', width: '' },
      { size: '23', length: '14', width: '' },
      { size: '24', length: '14,5', width: '' },
      { size: '25', length: '15,5', width: '' },
      { size: '26', length: '16', width: '' },
      { size: '27', length: '16,5', width: '' },
      { size: '28', length: '17,5', width: '' },
      { size: '29', length: '18', width: '' },
      { size: '30', length: '18,5', width: '' },
      { size: '31', length: '19,5', width: '' },
      { size: '32', length: '20', width: '' },
      { size: '33', length: '20,5', width: '' },
      { size: '34', length: '21,5', width: '' },
    ]
  },
  {
    id: 'igor-ura',
    brand: 'Igor',
    model: 'Ura (Adulto)',
    data: [
      { size: '36', length: '23,2', width: '8,9' },
      { size: '37', length: '23,8', width: '9,0' },
      { size: '38', length: '24,5', width: '9,2' },
      { size: '39', length: '25,1', width: '9,3' },
      { size: '40', length: '25,8', width: '9,5' },
      { size: '41', length: '26,4', width: '9,6' },
    ]
  },

  // LEJAN
  {
    id: 'lejan-melrose-crianca',
    brand: 'Lejan',
    model: 'Melrose (Criança)',
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
    id: 'lejan-melrose-adulto',
    brand: 'Lejan',
    model: 'Melrose (Adulto)',
    data: [
      { size: '36', length: '23,9', width: '8,8' },
      { size: '37', length: '24,6', width: '9,0' },
      { size: '38', length: '25,5', width: '9,2' },
      { size: '39', length: '26,3', width: '9,3' },
      { size: '40', length: '26,9', width: '9,5' },
      { size: '41', length: '27,4', width: '9,6' },
      { size: '42', length: '28,2', width: '9,9' },
      { size: '43', length: '28,9', width: '10,1' },
      { size: '44', length: '29,5', width: '10,2' },
      { size: '45', length: '29,9', width: '10,3' },
      { size: '46', length: '30,3', width: '10,5' },
    ]
  },
  {
    id: 'lejan-one-crianca',
    brand: 'Lejan',
    model: 'One (Criança)',
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
    id: 'lejan-one-adulto',
    brand: 'Lejan',
    model: 'One (Adulto)',
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
      { size: '46', length: '30,6', width: '10,0' },
    ]
  },

  // MUM
  {
    id: 'mum',
    brand: 'MUM',
    model: 'Ines, Atlas, Eva, Daniela, Carolina',
    data: [
      { size: '36', length: '24', width: '9,2' },
      { size: '37', length: '24,8', width: '9,4' },
      { size: '38', length: '25,4', width: '9,4' },
      { size: '39', length: '26,1', width: '9,6' },
      { size: '40', length: '26,7', width: '9,6' },
      { size: '41', length: '27,5', width: '9,8' },
      { size: '42', length: '28', width: '9,8' },
    ]
  },
  // BY RORA — Rora
  {
    id: 'by-rora-rora',
    brand: 'By Rora',
    model: 'Rora',
    data: [
      { size: '18', length: '11,8', width: '5,6' },
      { size: '19', length: '12,3', width: '5,7' },
      { size: '20', length: '12,6', width: '5,8' },
      { size: '21', length: '13,3', width: '5,9' },
      { size: '21.5', length: '13,8', width: '6,0' },
      { size: '22', length: '14,4', width: '6,2' },
      { size: '23', length: '14,9', width: '6,3' },
    ]
  },

  // BY RORA — Atenas
  {
    id: 'by-rora-atenas',
    brand: 'By Rora',
    model: 'Atenas',
    data: [
      { size: '21', length: '13,0', width: '5,7' },
      { size: '22', length: '13,6', width: '5,8' },
      { size: '23', length: '14,2', width: '6,0' },
      { size: '24', length: '14,5', width: '6,1' },
      { size: '25', length: '15,2', width: '6,1' },
      { size: '26', length: '15,6', width: '6,3' },
      { size: '27', length: '16,2', width: '6,5' },
    ]
  },

  // BY RORA — Salvador
  {
    id: 'by-rora-salvador',
    brand: 'By Rora',
    model: 'Salvador',
    data: [
      { size: '21', length: '13,0', width: '5,7' },
      { size: '22', length: '13,8', width: '6,0' },
      { size: '23', length: '14,2', width: '6,1' },
      { size: '24', length: '14,5', width: '6,1' },
      { size: '25', length: '15,0', width: '6,1' },
      { size: '26', length: '15,5', width: '6,3' },
      { size: '27', length: '16,2', width: '6,5' },
    ]
  },
  // MUSTANG — Free Kids
  {
    id: 'mustang-free-kids',
    brand: 'Mustang',
    model: 'Free Kids',
    data: [
      { size: '27', length: '17,93', width: '6,65' },
      { size: '28', length: '18,6', width: '6,8' },
      { size: '29', length: '19,27', width: '6,95' },
      { size: '30', length: '19,93', width: '7,1' },
      { size: '31', length: '20,6', width: '7,25' },
      { size: '32', length: '21,27', width: '7,4' },
      { size: '33', length: '21,94', width: '7,55' },
      { size: '34', length: '22,6', width: '7,7' },
    ]
  },

  // MUSTANG — Adulto (Free-Aria)
  {
    id: 'mustang-adulto-free-aria',
    brand: 'Mustang',
    model: 'Adulto (Free-Aria)',
    data: [
      { size: '36', length: '23,33', width: '8,25' },
      { size: '37', length: '24,0', width: '8,4' },
      { size: '38', length: '24,67', width: '8,55' },
      { size: '39', length: '25,33', width: '8,7' },
      { size: '40', length: '26,0', width: '8,85' },
      { size: '41', length: '26,67', width: '9,0' },
    ]
  },

  // MUSTANG — Adulto (Free-Miami)
  {
    id: 'mustang-adulto-free-miami',
    brand: 'Mustang',
    model: 'Adulto (Free-Miami)',
    data: [
      { size: '40', length: '26,17', width: '8,9' },
      { size: '41', length: '26,83', width: '9,05' },
      { size: '42', length: '27,5', width: '9,2' },
      { size: '43', length: '28,17', width: '9,35' },
      { size: '44', length: '28,83', width: '9,5' },
      { size: '45', length: '29,5', width: '9,65' },
      { size: '46', length: '30,17', width: '9,8' },
    ]
  }
];
