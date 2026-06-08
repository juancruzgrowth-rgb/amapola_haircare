import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import { QuizAnswers, Routine } from './recommendations.js'

Font.register({
  family: 'Cormorant Garamond',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf', fontWeight: 400, fontStyle: 'normal' },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_hg9GnM.ttf', fontWeight: 700, fontStyle: 'normal' },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf', fontWeight: 400, fontStyle: 'italic' },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5FTfOjw.ttf', fontWeight: 700, fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf', fontWeight: 600 },
  ],
})

const colors = {
  oliva: '#5D6044',
  olivaClaro: '#8A8E70',
  terracota: '#A75754',
  crema: '#F7F5F0',
  arena: '#D9D2C8',
  salvia: '#BFC3AE',
  texto: '#2B2B2B',
  textoSuave: '#6A6A6A',
  blanco: '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.crema,
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    padding: 56,
    lineHeight: 1.6,
  },
  pageCover: {
    backgroundColor: colors.crema,
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    padding: 0,
    lineHeight: 1.6,
  },
  // ── Portada ──────────────────────────────────────────────────
  coverWrap: {
    flex: 1,
    backgroundColor: colors.crema,
    paddingHorizontal: 64,
    paddingTop: 52,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  coverTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  coverBrand: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 20,
    color: colors.oliva,
    letterSpacing: 5,
  },
  coverBadge: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.terracota,
    borderWidth: 0.5,
    borderColor: colors.terracota,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    letterSpacing: 2,
  },
  coverDivider: {
    height: 0.5,
    backgroundColor: colors.arena,
    marginVertical: 12,
  },
  coverMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  coverEyebrow: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.terracota,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  coverTitle: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 52,
    color: colors.oliva,
    textAlign: 'center',
    lineHeight: 1.1,
  },
  coverItalic: {
    fontFamily: 'Cormorant Garamond',
    fontStyle: 'italic',
    fontSize: 52,
    color: colors.terracota,
  },
  coverAccentLine: {
    width: 40,
    height: 1,
    backgroundColor: colors.terracota,
    marginVertical: 20,
    alignSelf: 'center',
  },
  coverName: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: colors.textoSuave,
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  coverFooter: {
    alignItems: 'center',
  },
  coverFooterLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.textoSuave,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  coverFooterValues: {
    flexDirection: 'row',
    gap: 20,
  },
  coverFooterValue: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 13,
    color: colors.oliva,
    letterSpacing: 1.5,
  },
  // ── Páginas internas ─────────────────────────────────────────
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.arena,
  },
  pageHeaderBrand: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 13,
    color: colors.oliva,
    letterSpacing: 4,
  },
  pageHeaderLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.textoSuave,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  // Sección con acento visual izquierdo
  sectionAccent: {
    borderLeftWidth: 2,
    borderLeftColor: colors.terracota,
    paddingLeft: 12,
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.terracota,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 30,
    color: colors.oliva,
    lineHeight: 1.15,
  },
  paragraph: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    marginBottom: 14,
    lineHeight: 1.75,
  },
  paragraphMuted: {
    fontFamily: 'Inter',
    fontSize: 10.5,
    color: colors.textoSuave,
    marginBottom: 12,
    lineHeight: 1.75,
  },
  // Tarjeta diagnóstico
  diagnosisCard: {
    backgroundColor: colors.blanco,
    padding: 20,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.arena,
  },
  diagnosisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEECE8',
  },
  diagnosisRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  diagnosisKey: {
    fontFamily: 'Inter',
    fontSize: 9,
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
  // Pasos de rutina
  step: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.arena,
  },
  stepNumberWrap: {
    width: 40,
    height: 40,
    backgroundColor: colors.oliva,
    borderRadius: 20,
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumber: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 17,
    color: colors.crema,
    textAlign: 'center',
    lineHeight: 1,
  },
  stepBody: {
    flex: 1,
  },
  stepProductName: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 18,
    color: colors.oliva,
    marginBottom: 4,
    lineHeight: 1.2,
  },
  stepFrequency: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.terracota,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  stepInstructions: {
    fontFamily: 'Inter',
    fontSize: 10.5,
    color: colors.texto,
    lineHeight: 1.65,
  },
  // Tips
  tipRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  tipBullet: {
    width: 6,
    height: 6,
    backgroundColor: colors.terracota,
    borderRadius: 3,
    marginRight: 12,
    marginTop: 5,
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.texto,
    lineHeight: 1.65,
  },
  // CTA page
  ctaPage: {
    flex: 1,
    backgroundColor: colors.oliva,
    padding: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaAccentLine: {
    width: 32,
    height: 1,
    backgroundColor: colors.salvia,
    marginBottom: 24,
  },
  ctaLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.salvia,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  ctaTitle: {
    fontFamily: 'Cormorant Garamond',
    fontWeight: 700,
    fontSize: 40,
    color: colors.crema,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 1.15,
  },
  ctaSubtitle: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.arena,
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 1.7,
    maxWidth: 360,
  },
  ctaButtonWrap: {
    backgroundColor: colors.terracota,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 4,
    marginBottom: 44,
  },
  ctaButton: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: colors.crema,
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  ctaSocial: {
    flexDirection: 'row',
    gap: 28,
    marginTop: 8,
  },
  ctaSocialItem: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.salvia,
    letterSpacing: 1.5,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 24,
    right: 56,
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.arena,
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

    {/* ── Portada ─────────────────────────────────────────── */}
    <Page size="A4" style={styles.pageCover}>
      <View style={styles.coverWrap}>
        <View>
          <View style={styles.coverTopBar}>
            <Text style={styles.coverBrand}>AMAPOLA</Text>
            <Text style={styles.coverBadge}>HAIRCARE</Text>
          </View>
          <View style={styles.coverDivider} />
        </View>

        <View style={styles.coverMiddle}>
          <Text style={styles.coverEyebrow}>Rutina personalizada</Text>
          <Text style={styles.coverTitle}>
            Tu rutina{'\n'}
            <Text style={styles.coverItalic}>capilar</Text>
          </Text>
          <View style={styles.coverAccentLine} />
          <Text style={styles.coverName}>Para {name}</Text>
        </View>

        <View style={styles.coverFooter}>
          <View style={styles.coverDivider} />
          <View style={{ height: 12 }} />
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

    {/* ── Diagnóstico ─────────────────────────────────────── */}
    <Page size="A4" style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderBrand}>AMAPOLA</Text>
        <Text style={styles.pageHeaderLabel}>Rutina personalizada</Text>
      </View>

      <View style={styles.sectionAccent}>
        <Text style={styles.sectionLabel}>Bienvenida/o</Text>
        <Text style={styles.sectionTitle}>Tu diagnóstico capilar</Text>
      </View>

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

    {/* ── Rutina paso a paso ──────────────────────────────── */}
    <Page size="A4" style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderBrand}>AMAPOLA</Text>
        <Text style={styles.pageHeaderLabel}>Rutina personalizada</Text>
      </View>

      <View style={styles.sectionAccent}>
        <Text style={styles.sectionLabel}>Paso a paso</Text>
        <Text style={styles.sectionTitle}>Tu rutina recomendada</Text>
      </View>

      <View style={{ height: 16 }} />

      {routine.steps.map(step => (
        <View key={step.order} style={styles.step} wrap={false}>
          <View style={styles.stepNumberWrap}>
            <Text style={styles.stepNumber}>{step.order}</Text>
          </View>
          <View style={styles.stepBody}>
            <Text style={styles.stepProductName}>{step.productName}</Text>
            <Text style={styles.stepFrequency}>{step.frequency}</Text>
            <Text style={styles.stepInstructions}>{step.instructions}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.pageNumber}>03</Text>
    </Page>

    {/* ── Tips ───────────────────────────────────────────── */}
    <Page size="A4" style={styles.page}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderBrand}>AMAPOLA</Text>
        <Text style={styles.pageHeaderLabel}>Rutina personalizada</Text>
      </View>

      <View style={styles.sectionAccent}>
        <Text style={styles.sectionLabel}>Consejos especiales</Text>
        <Text style={styles.sectionTitle}>Tips para tu tipo de cabello</Text>
      </View>

      <View style={{ height: 20 }} />

      {routine.tips.map((tip, i) => (
        <View key={i} style={styles.tipRow}>
          <View style={styles.tipBullet} />
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}

      <View style={{ marginTop: 28 }}>
        <Text style={styles.paragraphMuted}>{routine.outro}</Text>
      </View>

      <Text style={styles.pageNumber}>04</Text>
    </Page>

    {/* ── CTA ─────────────────────────────────────────────── */}
    <Page size="A4" style={styles.pageCover}>
      <View style={styles.ctaPage}>
        <View style={styles.ctaAccentLine} />
        <Text style={styles.ctaLabel}>Comienza tu rutina</Text>
        <Text style={styles.ctaTitle}>Tu cabello te lo agradecerá</Text>
        <Text style={styles.ctaSubtitle}>
          Encuentra tus productos en la tienda y comienza esta semana. Los resultados de una rutina natural se construyen con constancia.
        </Text>
        <View style={styles.ctaButtonWrap}>
          <Text style={styles.ctaButton}>Visitar tienda → {appUrl.replace(/^https?:\/\//, '')}</Text>
        </View>
        <Text style={[styles.ctaLabel, { marginBottom: 8 }]}>Síguenos</Text>
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
