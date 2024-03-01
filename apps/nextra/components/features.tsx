import { useRouter } from 'nextra/hooks'
import styles from './features.module.css'

const Feature = ({ text, icon }) => (
  <div className={styles.feature}>
    {icon}
    <h4>{text}</h4>
  </div>
)

const TITLE_WITH_TRANSLATIONS = {
  en: 'Blockchain docs have never been this easy',
  es: 'Los documentos de blockchain nunca han sido tan fáciles.',
  ru: 'Документация по блокчейну никогда не была такой простой'
}

// Translations for Features
const FEATURES_WITH_TRANSLATIONS = {
  en: {
    lightweight: 'Lightweight',
    darkMode: 'Dark Mode',
    latex: 'LaTeX',
    pagination: 'Pagination',
    i18n: 'i18n',
    renderingStrategies: 'SSR / SSG Ready',
    typescript: 'TypeScript Ready',
    mermaid: 'Mermaid'
  },
  es: {
    lightweight: 'Ligero',
    darkMode: 'Modo Oscuro',
    latex: 'LaTeX',
    pagination: 'Paginación',
    i18n: 'i18n',
    renderingStrategies: 'Preparado para SSR / SSG',
    typescript: 'Listo para TypeScript',
    mermaid: 'Mermaid'
  },
  ru: {
    lightweight: 'Лёгкий',
    darkMode: 'Тёмный режим',
    latex: 'LaTeX',
    pagination: 'Пагинация',
    i18n: 'i18n',
    renderingStrategies: 'Готово к SSR / SSG',
    typescript: 'Поддержка TypeScript',
    mermaid: 'Mermaid'
  }
}

export default function Features() {
  const { locale, defaultLocale } = useRouter()

  const featureText = key =>
    FEATURES_WITH_TRANSLATIONS[locale!]?.[key] ??
    FEATURES_WITH_TRANSLATIONS[defaultLocale!][key] // Fallback for missing translations

  return (
    <div className="mx-auto mb-10 w-[880px] max-w-full px-4 text-center">
      <br />
      <p className="mb-2 text-lg text-gray-600 md:!text-2xl">
        {TITLE_WITH_TRANSLATIONS[locale!]}
      </p>
      <br />
      <div className={styles.features}>
        <Feature
          text={featureText('lightweight')}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
              <line x1="16" y1="8" x2="2" y2="22" />
              <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
          }
        />
        <Feature
          text={featureText('darkMode')}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          }
        />
        <Feature
          text={featureText('latex')}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="10" y1="15" x2="10" y2="9" />
              <line x1="14" y1="15" x2="14" y2="9" />
            </svg>
          }
        />
        <Feature
          text={featureText('pagination')}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          }
        />
        <Feature
          text={featureText('i18n')}
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1.92 1.92"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.545 0.806 0.493 0.96H0.36l0.223 -0.6h0.154L0.96 0.96H0.82l-0.052 -0.154H0.545zm0.196 -0.088L0.66 0.475h-0.006l-0.081 0.243H0.742z" />
              <path d="M0 0.24a0.24 0.24 0 0 1 0.24 -0.24h0.84a0.24 0.24 0 0 1 0.24 0.24v0.36h0.36a0.24 0.24 0 0 1 0.24 0.24v0.84a0.24 0.24 0 0 1 -0.24 0.24H0.84a0.24 0.24 0 0 1 -0.24 -0.24v-0.36H0.24a0.24 0.24 0 0 1 -0.24 -0.24V0.24zm0.24 -0.12a0.12 0.12 0 0 0 -0.12 0.12v0.84a0.12 0.12 0 0 0 0.12 0.12h0.84a0.12 0.12 0 0 0 0.12 -0.12V0.24a0.12 0.12 0 0 0 -0.12 -0.12H0.24zm0.857 1.199c0.023 0.036 0.048 0.07 0.076 0.102 -0.09 0.069 -0.201 0.12 -0.332 0.155 0.021 0.026 0.054 0.076 0.067 0.104 0.135 -0.043 0.25 -0.101 0.346 -0.179 0.093 0.08 0.209 0.14 0.352 0.177 0.016 -0.03 0.05 -0.081 0.075 -0.107 -0.135 -0.03 -0.247 -0.083 -0.338 -0.154 0.082 -0.09 0.147 -0.198 0.195 -0.331H1.68V0.96h-0.36v0.126h0.092c-0.038 0.101 -0.089 0.186 -0.153 0.256a0.728 0.728 0 0 1 -0.05 -0.059 0.239 0.239 0 0 1 -0.113 0.037z" />
            </svg>
          }
        />
        <Feature
          text={featureText('renderingStrategies')}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          }
        />
        <Feature
          text={featureText('typescript')}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
            </svg>
          }
        />
        <Feature
          text={featureText('mermaid')}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="19.808034896850586 26.64682388305664 78.02238464355469 64.34417724609375"
              version="1.1"
              xmlSpace="preserve"
              fill="currentColor"
            >
              <path d="M97.795 26.683c-17.254 -0.738 -33.098 9.878 -38.976 26.117 -5.878 -16.239 -21.722 -26.855 -38.976 -26.117 -0.575 13.692 5.975 26.748 17.294 34.474 5.8 3.984 9.266 10.591 9.247 17.628v12.206H71.256v-12.206c-0.02 -7.036 3.445 -13.644 9.245 -17.628 11.322 -7.722 17.873 -20.781 17.294 -34.474Z" />
            </svg>
          }
        />
      </div>
    </div>
  )
}
