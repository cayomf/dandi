import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { chain } from '../../lib/chain';
import { getReadmeContent } from '../../lib/github';

export async function POST(request: Request) {
  try {
    // Validação da chave API
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Chave API não fornecida no cabeçalho' },
        { status: 400 }
      );
    }

    // Validar a chave API no Supabase
    const { error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('value', apiKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, message: 'Chave API inválida' },
          { status: 401 }
        );
      }
      throw error;
    }

    // Obter e validar URL do GitHub
    const { githubUrl } = await request.json();

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, message: 'URL do GitHub não fornecida' },
        { status: 400 }
      );
    }

    // Obter conteúdo do README e gerar resumo
    const readmeContent = await getReadmeContent(githubUrl);
    const result = await chain.invoke({
      readmeContent: readmeContent
    });

    return NextResponse.json({
      success: true,
      summary: result
    });

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 


