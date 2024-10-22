import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();
    console.log('Chave API recebida:', apiKey);

    const { error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('value', apiKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Chave não encontrada
        return NextResponse.json({ valid: false, message: 'Chave API inválida' }, { status: 404 });
      }
      throw error;
    }

    // Chave encontrada
    return NextResponse.json({ valid: true, message: 'Chave API válida' });

  } catch (error) {
    console.error('Erro ao validar a chave API:', error);
    return NextResponse.json(
      {
        valid: false,
        message: 'Erro interno ao validar chave API',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
