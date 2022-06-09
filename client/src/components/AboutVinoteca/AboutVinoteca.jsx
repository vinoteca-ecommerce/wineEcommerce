import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container } from '@mui/system';
import img from '../../images/wineAbout.webp'


export const AboutVinoteca = () => {
  return (
    <Container sx={{maxWidth: "100vw", padding: "20px"}}>
      <Card sx={{maxWidth: 800, maxHeight: 900}}>
        <CardMedia component="img" height="140" image={img} alt="wineAbout" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            ¿Quiénes Somos?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Creado en 2022, el concepto VINOTECA ha revolucionado el enfoque
            tradicional del comercio del vinos y el mundo de la distribución,
            destacando en particular la fuerte dimensión cultural del producto.
            VINOTECA ofrece una gran variedad de vinos de diferentes regiones
            con envios a todo el pais.
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            ¿Como cuidamos el vino?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Todos nuestros vinos se conservan en posición horizontal. La
            temperatura de la tienda y la luz está pensada para proteger las
            botellas con el paso del tiempo. Algunos vinos, por su carácter
            añejo, raro o simplemente frágil, merecen un tratamiento muy
            especial: se exponen en la Cava, un espacio cerrado con una
            temperatura constante a 14ºC y un 70% de humedad lo que garantiza
            unas condiciones óptimas de conservación. Tanto el embalaje como la
            entrega también están optimizados para garantizar un servicio de
            calidad que está en la continuidad de este enfoque.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
