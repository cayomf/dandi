import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();
    console.log('Chave API recebida:', apiKey);

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('value', apiKey);

    console.log('Resultado da consulta:', JSON.stringify({ data, error }, null, 2));

    if (error) {
      throw error;
    }

    const isValid = Array.isArray(data) && data.length > 0;

    return NextResponse.json({
      valid: isValid,
      message: isValid ? 'Chave API válida' : 'Chave API não encontrada'
    });

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
