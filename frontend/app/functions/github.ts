export async function getReadme(repoUrl: string) {
	const repository = repoUrl.split('github.com/')[1]
	const readmeUrl = `https://raw.githubusercontent.com/${repository}/main/README.md`
	const response = await fetch(readmeUrl)
	return response.text()
}
