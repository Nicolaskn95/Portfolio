export type Locale = 'pt' | 'en'

export const LOCALE_STORAGE_KEY = 'portfolio-locale'

export const messages: Record<
	Locale,
	Record<string, string>
> = {
	pt: {
		menu_home: 'Home',
		menu_projects: 'Projects',
		menu_contact: 'Contact',
		header_aria_home: 'Início',
		header_profile: 'Perfil',
		lang_switch_aria: 'Idioma do portfólio',
		lang_pt: 'PT',
		lang_en: 'EN',
		footer_quote:
			'\"Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.\" — Provérbios 16:3',
		home_projects_0: 'Nenhum projeto cadastrado no portfólio.',
		home_projects_1: '1 projeto cadastrado no portfólio.',
		home_projects_n: '{count} projetos cadastrados no portfólio.',
		projects_highlights: 'Destaques',
		projects_web: 'Web',
		projects_mobile: 'Mobile',
		main_role: 'Software Developer',
		typing_phrase:
			'Modelando problemas do mundo real e arquitetando soluções no mundo digital.',
		resume_title: 'Resumo',
		resume_mini_cv_role: 'Software Developer',
		resume_mini_cv_bio:
			'Cristão, marido e pai. Como desenvolvedor, busco a excelência em meu trabalho como forma de honrar e servir ao Senhor Jesus Cristo.',
		resume_knowledge_projects: 'Projetos criados',
		resume_knowledge_years: 'anos de experiência',
		resume_technologies_heading: 'Tecnologias',
		contact_title: 'Contato',
		contact_intro: 'Fique à vontade para se conectar comigo através das plataformas abaixo.',
		contact_linkedin_desc: 'Conecte-se comigo profissionalmente',
		contact_github_desc: 'Confira meus repositórios',
		readme_translating: 'Traduzindo README…',
	},
	en: {
		menu_home: 'Home',
		menu_projects: 'Projects',
		menu_contact: 'Contact',
		header_aria_home: 'Home',
		header_profile: 'Profile',
		lang_switch_aria: 'Portfolio language',
		lang_pt: 'PT',
		lang_en: 'EN',
		footer_quote:
			'\"Commit to the Lord whatever you do, and he will establish your plans.\" — Proverbs 16:3',
		home_projects_0: 'No projects listed in the portfolio yet.',
		home_projects_1: '1 project listed in the portfolio.',
		home_projects_n: '{count} projects listed in the portfolio.',
		projects_highlights: 'Highlights',
		projects_web: 'Web',
		projects_mobile: 'Mobile',
		main_role: 'Software Developer',
		typing_phrase:
			'Modeling real-world problems and architecting solutions in the digital world.',
		resume_title: 'Summary',
		resume_mini_cv_role: 'Software Developer',
		resume_mini_cv_bio:
			'Christian, husband, and father. As a developer, I pursue excellence in my work as a way to honor and serve the Lord Jesus Christ.',
		resume_knowledge_projects: 'Projects built',
		resume_knowledge_years: 'years of experience',
		resume_technologies_heading: 'Technologies',
		contact_title: 'Contact',
		contact_intro: 'Feel free to connect with me through the platforms below.',
		contact_linkedin_desc: 'Connect with me professionally',
		contact_github_desc: 'Browse my repositories',
		readme_translating: 'Translating README…',
	},
}
