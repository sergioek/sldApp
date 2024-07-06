import React from 'react';
import { Page, Text, View, Document, StyleSheet,PDFDownloadLink } from '@react-pdf/renderer';

// Estilos para el documento PDF
const styles = StyleSheet.create({
  tr: {
    height: 'auto',
  },
  col: {
    width: 'auto',
  },
  br: {
    placement: 'same-cell',
  },
  style0: {
    numberFormat: 'General',
    textAlign: 'general',
    verticalAlign: 'bottom',
    whiteSpace: 'nowrap',
    rotate: 0,
    backgroundSource: 'auto',
    pattern: 'auto',
    color: 'black',
    fontSize: 11,
    fontWeight: 400,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Calibri, sans-serif',
    border: 'none',
    protection: 'locked visible',
  },
  font5: {
    color: 'windowtext',
    fontSize: 10,
    fontWeight: 700,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: '"Arial Black", sans-serif',
  },
  font6: {
    color: 'windowtext',
    fontSize: 10,
    fontWeight: 700,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Calibri, sans-serif',
  },
  font7: {
    color: 'windowtext',
    fontSize: 9,
    fontWeight: 400,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Calibri, sans-serif',
  },
  font8: {
    color: 'windowtext',
    fontSize: 10,
    fontWeight: 400,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Calibri, sans-serif',
  },
  font17: {
    color: 'red',
    fontSize: 10,
    fontWeight: 700,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: '"Arial Black", sans-serif',
  },
  font18: {
    color: 'red',
    fontSize: 9,
    fontWeight: 700,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: '"Arial Black", sans-serif',
  },
  font19: {
    color: 'windowtext',
    fontSize: 9,
    fontWeight: 700,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Calibri, sans-serif',
  },
  td: {
    paddingTop: 1,
    paddingRight: 1,
    paddingLeft: 1,
    color: 'black',
    fontSize: 11,
    fontWeight: 400,
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Calibri, sans-serif',
    textAlign: 'general',
    verticalAlign: 'bottom',
    border: 'none',
    whiteSpace: 'nowrap',
    rotate: 0,
  },
  xl65: {
    color: 'red',
    fontSize: 9,
    fontWeight: 700,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl66: {
    color: '#3210B0',
    fontSize: 8,
    numberFormat: 'd\\-mmm',
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl67: {
    color: '#3210B0',
    fontSize: 8,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl68: {
    color: 'red',
    fontSize: 8,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl69: {
    color: 'windowtext',
    fontSize: 8,
    numberFormat: 'd\\-mmm',
    border: '.5pt solid windowtext',
  },
  xl70: {
    color: 'red',
    fontSize: 9,
    fontWeight: 700,
    border: '.5pt solid windowtext',
  },
  xl71: {
    fontSize: 8,
    border: '.5pt solid windowtext',
  },
  xl72: {
    color: '#0000CC',
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl73: {
    color: '#0000CC',
    fontSize: 8,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl74: {
    color: 'red',
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl75: {
    color: 'red',
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
  },
  xl76: {
    color: '#0000CC',
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
  },
  xl77: {
    color: '#0000CC',
    fontSize: 8,
    numberFormat: 'Short Date',
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
  },
  xl78: {
    color: '#0000CC',
    fontSize: 8,
    fontWeight: 700,
    numberFormat: 'Short Date',
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
  },
  xl79: {
    color: 'red',
    fontSize: 8,
    border: '.5pt solid windowtext',
  },
  xl80: {
    color: 'red',
    fontSize: 8,
    fontWeight: 700,
    numberFormat: 'Short Date',
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl81: {
    color: '#0000CC',
    fontSize: 8,
    fontWeight: 700,
    numberFormat: 'Short Date',
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl82: {
    color: 'windowtext',
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    border: '.5pt solid windowtext',
  },
  xl83: {
    color: '#C00000',
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
  },
  xl84: {
    fontWeight: 700,
  },
  xl85: {
    color: 'windowtext',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '.5pt solid windowtext',
    borderRight: '.5pt solid windowtext',
    borderBottom: '.5pt solid windowtext',
    borderLeft: '1.5pt solid windowtext',
    whiteSpace: 'normal',
  },
  xl86: {
    color: 'windowtext',
    fontSize: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
  },
  xl87: {
    color: 'windowtext',
    fontSize: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '.5pt solid windowtext',
    whiteSpace: 'normal',
  },
  xl88: {
    color: 'windowtext',
    fontSize: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '.5pt solid windowtext',
    borderRight: '1.5pt solid windowtext',
    borderBottom: '.5pt solid windowtext',
    borderLeft: '.5pt solid windowtext',
  },
  xl89: {
    color: 'red',
    fontSize: 8,
    borderTop: '.5pt solid windowtext',
    borderRight: '1.5pt solid windowtext',
    borderBottom: '.5pt solid windowtext',
    borderLeft: '.5pt solid windowtext',
  },
  xl90: {
    fontSize: 8,
    borderTop: '.5pt solid windowtext',
    borderRight: '1.5pt solid windowtext',
    borderBottom: '.5pt solid windowtext',
    borderLeft: '.5pt solid windowtext',
  },
  xl91: {
    color: 'windowtext',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '.5pt solid windowtext',
    borderRight: '.5pt solid windowtext',
    borderBottom: '1.5pt solid windowtext',
    borderLeft: '1.5pt solid windowtext',
    whiteSpace: 'normal',
  },
  xl92: {
    color: 'windowtext',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '.5pt solid windowtext',
    borderRight: '1.5pt solid windowtext',
    borderBottom: '1.5pt solid windowtext',
    borderLeft: '.5pt solid windowtext',
  },
  xl93: {
    color: 'windowtext',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    border: '1.5pt solid windowtext',
  },
  xl94: {
    color: 'windowtext',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '1.5pt solid windowtext',
    borderRight: '.5pt solid windowtext',
    borderBottom: '1.5pt solid windowtext',
    borderLeft: '1.5pt solid windowtext',
  },
  xl95: {
    color: 'windowtext',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '1.5pt solid windowtext',
    borderRight: '1.5pt solid windowtext',
    borderBottom: '1.5pt solid windowtext',
    borderLeft: '.5pt solid windowtext',
  },
  xl96: {
    color: 'windowtext',
    fontSize: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '1.5pt solid windowtext',
    borderRight: '1.5pt solid windowtext',
    borderBottom: '1.5pt solid windowtext',
    borderLeft: '.5pt solid windowtext',
  },
  xl97: {
    color: 'windowtext',
    fontSize: 8,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderTop: '1.5pt solid windowtext',
    borderRight: '.5pt solid windowtext',
    borderBottom: '1.5pt solid windowtext',
    borderLeft: '1.5pt solid windowtext',
  },
});

const TablePDF = () => (
  <Document>
    <Page size="A4">
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: "37%" }}>
            <Text style={styles.tableCell}>DIRECCIÓN GENERAL DE NIVEL SECUNDARIO</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "36%" }}>
            <Text style={styles.tableCell}>ANEXO RESOLUCIÓN Nº</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "27%" }}>
            <Text style={styles.tableCell}>PLANILLA A2 - HOJA 1 DE 8</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: "40%" }}>
            <Text style={styles.tableCell}>ESTABLECIMIENTO: ESC. TECNICA Nº 12</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text style={styles.tableCell}>Domicilio: Jose Cheein y Libertad</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>LOCALIDAD: FERNANDEZ</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>DPTO.: ROBLES</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>MES: MAYO</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>AÑO: 2024</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: "60%" }}>
            <Text style={styles.tableCell}>HORARIO DE FUNCIONAMIENTO: 7:30 a 12:30 / 14:00 a 18:00</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>TELEFAX:</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "25%" }}>
            <Text style={styles.tableCell}>E-MAIL: esctecnica12@gmail.com</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: "100%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: "4%" }}>
            <Text style={styles.tableCell}>Orden Nº</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "16%" }}>
            <Text style={styles.tableCell}>Apellido y Nombre</Text>
            <Text style={styles.tableCell}>consignar primero</Text>
            <Text style={styles.tableCell}>apellido de soltera</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>C.U.I.L. Nº</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Cargo</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text style={styles.tableCell}>Que inasisten</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Justificadas</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Total de Lic. con 100 % de Haberes</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Total de Lic. Con 50 % de Haberes</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Injustificadas</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Número de Tardanzas</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text style={styles.tableCell}>A Descontar</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Lic. sin goce de Sueldo</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}>Observaciones</Text>
          </View>
        </View>
        {/* Continúa con las filas de la tabla */}
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: "4%" }}>
            <Text style={styles.tableCell}>1</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "16%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "30%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: "10%" }}>
            <Text style={styles.tableCell}></Text>
          </View>
        </View>
        {/* Más filas según sea necesario */}
      </View>
    </Page>
  </Document>
);

// Componente principal con el botón para descargar el PDF
const App = () => (
  <div>
    <h1>Generar PDF</h1>
    <PDFDownloadLink document={<TablePDF />} fileName="table.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Generando documento...' : 'Descargar PDF'
      }
    </PDFDownloadLink>
  </div>
)
export default App;
