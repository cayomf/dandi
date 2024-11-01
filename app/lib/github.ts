export async function getReadmeContent(githubUrl: string): Promise<string> {
  try {
    // Extrair owner e repo da URL do GitHub
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];

    // URL da API do GitHub para obter o README
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    const response = await fetch(readmeUrl);
    
    if (!response.ok) {
      throw new Error(`Erro ao obter README: ${response.statusText}`);
    }

    const data = await response.json();
    
    // O conteúdo vem em base64, precisamos decodificar
    const readmeContent = Buffer.from(data.content, 'base64').toString('utf-8');
    
    return readmeContent;
  } catch (error) {
    console.error('Erro ao obter conteúdo do README:', error);
    throw new Error('Não foi possível obter o conteúdo do README');
  }
} 