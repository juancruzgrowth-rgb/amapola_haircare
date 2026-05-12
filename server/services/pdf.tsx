import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import { QuizAnswers, Routine } from './recommendations'

Font.register({
  family: 'Cormorant Garamond',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_g.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_jeM.ttf', fontWeight: 700 },
  ],
})

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.ttf', fontWeight: 600 },
  ],
})

const colors = {
  oliva: '#3D6044',
  terracota: '#A75754',
  crema: '#F7F5F0',
  arena: '#D9D2C8',
  salvia: '#BFC3AE',
  texto: '#2B2B2B',
  textoSuave: '#5A5A5A',
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.crema,
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    padding: 48,
    lineHeight: 1.6,
  },
  pageDark: {
    backgroundColor: colors.crema,
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    padding: 0,
    lineHeight: 1.6,
  },
  // Portada
  coverWrap: {
    flex: 1,
    backgroundColor: colors.crema,
    padding: 64,
    justifyContent: 'space-between',
  },
  coverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverBrand: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 22,
    color: colors.oliva,
    letterSpacing: 4,
  },
  coverBadge: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.terracota,
    border: `1pt solid ${colors.terracota}`,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    letterSpacing: 1.5,
  },
  coverMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverTitle: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 54,
    color: colors.oliva,
    textAlign: 'center',
    lineHeight: 1.1,
  },
  coverItalic: {
    fontFamily: 'Cormorant Garamond',
    fontStyle: 'italic',
    fontSize: 54,
    color: colors.terracota,
  },
  coverName: {
    marginTop: 24,
    fontFamily: 'Inter',
    fontSize: 14,
    color: colors.textoSuave,
    letterSpacing: 6,
    textTransform: 'uppercase',
  },
  coverFooter: {
    alignItems: 'center',
  },
  coverFooterLabel: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.textoSuave,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  coverFooterValues: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 24,
  },
  coverFooterValue: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 12,
    color: colors.oliva,
    letterSpacing: 1.5,
  },
  // Páginas internas
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 12,
    borderBottom: `0.5pt solid ${colors.arena}`,
  },
  pageHeaderBrand: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 14,
    color: colors.oliva,
    letterSpacing: 3,
  },
  pageHeaderLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.textoSuave,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionLabel: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.terracota,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 32,
    color: colors.oliva,
    marginBottom: 20,
    lineHeight: 1.15,
  },
  paragraph: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    marginBottom: 12,
    lineHeight: 1.7,
  },
  paragraphMuted: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.textoSuave,
    marginBottom: 12,
    lineHeight: 1.7,
    fontStyle: 'italic',
  },
  diagnosisCard: {
    backgroundColor: colors.arena,
    padding: 20,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 24,
  },
  diagnosisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottom: `0.5pt solid ${colors.crema}`,
  },
  diagnosisRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  diagnosisKey: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: colors.textoSuave,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  diagnosisValue: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 13,
    color: colors.oliva,
  },
  // Steps
  step: {
    flexDirection: 'row',
    marginBottom: 18,
    paddingBottom: 18,
    borderBottom: `0.5pt solid ${colors.arena}`,
  },
  stepNumber: {
    width: 44,
    height: 44,
    backgroundColor: colors.oliva,
    color: colors.crema,
    borderRadius: 22,
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 11,
    marginRight: 16,
  },
  stepBody: {
    flex: 1,
  },
  stepProductRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  stepProductName: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 17,
    color: colors.oliva,
  },
  stepProductPrice: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.terracota,
    fontWeight: 600,
  },
  stepFrequency: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.terracota,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  stepInstructions: {
    fontFamily: 'Inter',
    fontSize: 10.5,
    color: colors.texto,
    lineHeight: 1.6,
  },
  // Tips
  tipRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 14,
    color: colors.terracota,
    marginRight: 10,
    marginTop: -2,
  },
  tipText: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    lineHeight: 1.6,
  },
  // CTA page
  ctaPage: {
    flex: 1,
    backgroundColor: colors.oliva,
    padding: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaLabel: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.salvia,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  ctaTitle: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 42,
    color: colors.crema,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 1.15,
  },
  ctaSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: colors.arena,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 1.6,
    maxWidth: 380,
  },
  ctaButton: {
    backgroundColor: colors.terracota,
    color: colors.crema,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 4,
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 40,
  },
  ctaSocial: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 12,
  },
  ctaSocialItem: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: colors.arena,
    letterSpacing: 1.5,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 24,
    right: 48,
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.textoSuave,
    letterSpacing: 1,
  },
})

const ANSWER_LABELS: Record<string, Record<string, string>> = {
  hair_type: { liso: 'Liso', ondulado: 'Ondulado', rizado: 'Rizado', coily: 'Coily / Afro' },
  hair_porosity: { baja: 'Baja', media: 'Media', alta: 'Alta', no_se: 'Por descubrir' },
  scalp_condition: { normal: 'Normal', graso: 'Graso', seco: 'Seco', sensible: 'Sensible' },
  main_concern: { caida: 'Caída', sequedad: 'Sequedad', frizz: 'Frizz', brillo: 'Falta de brillo' },
}

function labelFor(field: string, value?: string): string {
  if (!value) return '—'
  return ANSWER_LABELS[field]?.[value] ?? value
}

interface QuizPDFProps {
  name: string
  answers: QuizAnswers
  routine: Routine
  appUrl: string
}

const QuizPDF: React.FC<QuizPDFProps> = ({ name, answers, routine, appUrl }) => (
  <Document title={`Rutina Capilar Amapola — ${name}`} author="Amapola Haircare">
    {/* Portada */}
    <Page size="A4" style={styles.pageDark}>
      <View style={styles.coverWrap}>
        <View style={styles.coverHeader}>
          <Text style={styles.coverBrand}>AMAPOLA</Text>
          <Text style={styles.coverBadge}>HAIRCARE</Text>
        </View>

        <View style={styles.coverMiddle}>
          <Text style={styles.coverTitle}>
            Tu rutina capilar{'\n'}
            <Text style={styles.coverItalic}>personalizada</Text>
          </Text>
          <Text style={styles.coverName}>Para {name}</Text>
        </View>

        <View style={styles.coverFooter}>
          <Text style={styles.coverFooterLabel}>Esencia de marca</Text>
          <View style={styles.coverFooterValues}>
            <Text style={styles.coverFooterValue}>Natural</Text>
            <Text style={styles.coverFooterValue}>·</Text>
            <Text style={styles.coverFooterValue}>Elegante</Text>
            <Text style={styles.coverFooterValue}>·</Text>
            <Text style={styles.coverFooterValue}>Delicada</Text>
            <Text style={styles.coverFooterValue}>·</Text>
            <Text style={styles.coverFooterValue}>Premium</Text>
          </View>
        </View>
      </View>
    </Page>

    {/* Diagnóstico */}
    <Page size="A4" style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderBrand}>AMAPOLA</Text>
        <Text style={styles.pageHeaderLabel}>Rutina personalizada</Text>
      </View>

      <Text style={styles.sectionLabel}>Bienvenida</Text>
      <Text style={styles.sectionTitle}>Tu diagnóstico capilar</Text>
      <Text style={styles.paragraph}>{routine.intro}</Text>

      <View style={styles.diagnosisCard}>
        <View style={styles.diagnosisRow}>
          <Text style={styles.diagnosisKey}>Tipo de cabello</Text>
          <Text style={styles.diagnosisValue}>{labelFor('hair_type', answers.hair_type)}</Text>
        </View>
        <View style={styles.diagnosisRow}>
          <Text style={styles.diagnosisKey}>Porosidad</Text>
          <Text style={styles.diagnosisValue}>{labelFor('hair_porosity', answers.hair_porosity)}</Text>
        </View>
        <View style={styles.diagnosisRow}>
          <Text style={styles.diagnosisKey}>Cuero cabelludo</Text>
          <Text style={styles.diagnosisValue}>{labelFor('scalp_condition', answers.scalp_condition)}</Text>
        </View>
        <View style={styles.diagnosisRowLast}>
          <Text style={styles.diagnosisKey}>Preocupación principal</Text>
          <Text style={styles.diagnosisValue}>{labelFor('main_concern', answers.main_concern)}</Text>
        </View>
      </View>

      <Text style={styles.paragraphMuted}>{routine.diagnosis}</Text>

      <Text style={styles.pageNumber}>02</Text>
    </Page>

    {/* Rutina paso a paso */}
    <Page size="A4" style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderBrand}>AMAPOLA</Text>
        <Text style={styles.pageHeaderLabel}>Rutina personalizada</Text>
      </View>

      <Text style={styles.sectionLabel}>Paso a paso</Text>
      <Text style={styles.sectionTitle}>Tu rutina recomendada</Text>

      {routine.steps.map(step => (
        <View key={step.order} style={styles.step} wrap={false}>
          <Text style={styles.stepNumber}>{step.order}</Text>
          <View style={styles.stepBody}>
            <View style={styles.stepProductRow}>
              <Text style={styles.stepProductName}>{step.productName}</Text>
              <Text style={styles.stepProductPrice}>{step.productPrice}</Text>
            </View>
            <Text style={styles.stepFrequency}>{step.frequency}</Text>
            <Text style={styles.stepInstructions}>{step.instructions}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.pageNumber}>03</Text>
    </Page>

    {/* Tips */}
    <Page size="A4" style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderBrand}>AMAPOLA</Text>
        <Text style={styles.pageHeaderLabel}>Rutina personalizada</Text>
      </View>

      <Text style={styles.sectionLabel}>Consejos especiales</Text>
      <Text style={styles.sectionTitle}>Tips para tu tipo de cabello</Text>

      {routine.tips.map((tip, i) => (
        <View key={i} style={styles.tipRow}>
          <Text style={styles.tipBullet}>·</Text>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}

      <View style={{ marginTop: 32 }}>
        <Text style={styles.paragraphMuted}>{routine.outro}</Text>
      </View>

      <Text style={styles.pageNumber}>04</Text>
    </Page>

    {/* CTA */}
    <Page size="A4" style={styles.pageDark}>
      <View style={styles.ctaPage}>
        <Text style={styles.ctaLabel}>Comienza tu rutina</Text>
        <Text style={styles.ctaTitle}>Tu cabello te lo agradecerá</Text>
        <Text style={styles.ctaSubtitle}>
          Encuentra tus productos en la tienda y comienza esta semana. Los resultados de una rutina natural se construyen con constancia.
        </Text>
        <Text style={styles.ctaButton}>Visitar tienda → {appUrl.replace(/^https?:\/\//, '')}</Text>

        <Text style={[styles.ctaLabel, { marginTop: 16 }]}>Sígueme</Text>
        <View style={styles.ctaSocial}>
          <Text style={styles.ctaSocialItem}>Instagram · @amapolahaircare</Text>
          <Text style={styles.ctaSocialItem}>TikTok · @amapolahaircare</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export async function renderQuizPDF(
  name: string,
  answers: QuizAnswers,
  routine: Routine,
): Promise<Buffer> {
  const appUrl = process.env.APP_URL ?? 'https://amapola.com'
  const safeName = name?.trim() || 'Amapola'
  return await renderToBuffer(
    <QuizPDF name={safeName} answers={answers} routine={routine} appUrl={appUrl} />,
  )
}
