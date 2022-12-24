import { GenerateBarCode } from '../generate-barcode'

export const source =
'<style>' +
'*{margin: 0;padding: 0;}' +
'.container{ display:flex; width: 13rem; height:15rem; padding:1rem; margin-left:10px; flex-direction:column; font-family: Arial, Helvetica, sans-serif; border: 1px solid #000;}' +
'p{ margin: 10px; font-size: .7rem; margin-left: 3px;}' +
'span{justify-content: center;margin: auto;}' +
'</style>' +
'<div class="container"><p><strong>ticket:{{ticket}}</strong></p>' +

'<p><strong>licensePlate:{{licensePlate}}</strong></p>' +

'<p><img src={{img}}></p>' +

'<p><strong>type:{{type}}</strong></p>' +

'<p><strong>Hour:{{created_at}}</strong></p></div>'

export async function content (
  ticket: string,
  licensePlate: string,
  created_at: string,
  type: string): Promise<object> {
  return {
    ticket: `${ticket}`,
    licensePlate: `${licensePlate}`,
    created_at: `${created_at}`,
    type: `${type}`,
    img: await GenerateBarCode.generate(ticket)

  }
}
