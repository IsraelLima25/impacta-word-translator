import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from '../painel/frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  frases: Frase[] = FRASES
  instrucao: string = 'Traduza a frase'
  resposta: string = ''

  rodada: number = 0
  rodadaFrase!: Frase

  progresso: number = 0
  tentativas: number = 3

  @Output() encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizarRodada()
  }

  ngOnInit(): void { }

  atualizarResposta(event: Event): void {
    // this.resposta = (<HTMLInputElement>event.target).value
    this.resposta = (event.target as HTMLInputElement).value
  }

  verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr == this.resposta) {
      // incrementando a rodada
      this.rodada++
      // atualizando a porcentagem da barra de progresso
      this.progresso += (100 / this.frases.length)
      this.limparCampoResposta()
      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }
      this.atualizarRodada()
    } else {
      // decrementar a variavel tentativas      
      this.tentativas--
      if (this.tentativas === 0) {
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  atualizarRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
  }

  limparCampoResposta() {
    this.resposta = ''
  }

}
