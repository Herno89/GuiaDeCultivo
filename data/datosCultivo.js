const datosCultivo = [
    {
      nombre: "Tomate Cherry",
      genetica: "Micro Tom",
      fotoperiodo: "Automática",
      fechaIni: "2023-05-01",
      fechaFlor: "2023-06-15",
      img:"https://viveroagronomia.com.ar/wp-content/uploads/2024/07/cherry-tomate-1.jpg",
      riegos: [
        { fecha: "2023-05-05", realizado: true },
        { fecha: "2023-05-10", realizado: true },
        { fecha: "2023-05-15", realizado: false },
        { fecha: "2023-05-20", realizado: true }
      ]
    },
    {
      nombre: "Lechuga Romana",
      genetica: "Parris Island",
      fotoperiodo: "Día largo",
      fechaIni: "2023-04-15",
      fechaFlor: "2023-05-20",
      img:"https://previews.123rf.com/images/exopixel/exopixel1307/exopixel130700359/21021125-ensalada-de-lechuga-romana-hojas-verdes-en-una-maceta-de-pl%C3%A1stico-negro-aislado-sobre-fondo-blanco.jpg",
      riegos: [
        { fecha: "2023-04-20", realizado: true },
        { fecha: "2023-04-25", realizado: true },
        { fecha: "2023-04-30", realizado: true },
        { fecha: "2023-05-05", realizado: false }
      ]
    },
    {
      nombre: "Pimiento Jalapeño",
      genetica: "Early Jalapeño",
      fotoperiodo: "Día neutro",
      fechaIni: "2023-05-10",
      fechaFlor: "2023-06-25",
      img:"https://thumbs.dreamstime.com/z/crecimiento-en-conserva-de-la-planta-del-jalapeno-del-pimiento-picante-53805369.jpg",
      riegos: [
        { fecha: "2023-05-15", realizado: true },
        { fecha: "2023-05-20", realizado: true },
        { fecha: "2023-05-25", realizado: false },
        { fecha: "2023-05-30", realizado: true }
      ]
    },
    {
      nombre: "Tomaco",
      genetica: "injerto de tomate y tabaco",
      fotoperiodo: "Multiestacion",
      fechaIni: "1998-05-10",
      fechaFlor: "1998-05-11",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN9hwOsiDLTOBrY11RzHCSl6UTTqn2vNGOrA&s",
      riegos: [
        { fecha: "1998-05-10", realizado: true },
        { fecha: "1998-05-11", realizado: true },
        { fecha: "1998-05-12", realizado: false },
        { fecha: "1998-05-13", realizado: true }
      ]
    }
  ];
  
  if (!localStorage.getItem('cultivos')) {
    localStorage.setItem('cultivos', JSON.stringify(datosCultivo));
  }
  
  export function getCultivos() {
    return JSON.parse(localStorage.getItem('cultivos') || '[]');
  }
  
  export function addCultivo(cultivo) {
    const cultivos = getCultivos();
    cultivos.push(cultivo);
    localStorage.setItem('cultivos', JSON.stringify(cultivos));
  }
  