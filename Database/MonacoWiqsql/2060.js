"use strict";(self.webpackChunkwiql_editor=self.webpackChunkwiql_editor||[]).push([[2060],{32060:(e,o,n)=>{n.r(o),n.d(o,{conf:()=>t,language:()=>s});var t={comments:{lineComment:";",blockComment:["#|","|#"]},brackets:[["(",")"],["{","}"],["[","]"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}]},s={defaultToken:"",ignoreCase:!0,tokenPostfix:".scheme",brackets:[{open:"(",close:")",token:"delimiter.parenthesis"},{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"}],keywords:["case","do","let","loop","if","else","when","cons","car","cdr","cond","lambda","lambda*","syntax-rules","format","set!","quote","eval","append","list","list?","member?","load"],constants:["#t","#f"],operators:["eq?","eqv?","equal?","and","or","not","null?"],tokenizer:{root:[[/#[xXoObB][0-9a-fA-F]+/,"number.hex"],[/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?/,"number.float"],[/(?:\b(?:(define|define-syntax|define-macro))\b)(\s+)((?:\w|\-|\!|\?)*)/,["keyword","white","variable"]],{include:"@whitespace"},{include:"@strings"},[/[a-zA-Z_#][a-zA-Z0-9_\-\?\!\*]*/,{cases:{"@keywords":"keyword","@constants":"constant","@operators":"operators","@default":"identifier"}}]],comment:[[/[^\|#]+/,"comment"],[/#\|/,"comment","@push"],[/\|#/,"comment","@pop"],[/[\|#]/,"comment"]],whitespace:[[/[ \t\r\n]+/,"white"],[/#\|/,"comment","@comment"],[/;.*$/,"comment"]],strings:[[/"$/,"string","@popall"],[/"(?=.)/,"string","@multiLineString"]],multiLineString:[[/[^\\"]+$/,"string","@popall"],[/[^\\"]+/,"string"],[/\\./,"string.escape"],[/"/,"string","@popall"],[/\\$/,"string"]]}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjA2MC5qcyIsIm1hcHBpbmdzIjoicUpBSU8sSUFBSUEsRUFBTyxDQUNkQyxTQUFVLENBQ05DLFlBQWEsSUFDYkMsYUFBYyxDQUFDLEtBQU0sT0FFekJDLFNBQVUsQ0FDTixDQUFDLElBQUssS0FDTixDQUFDLElBQUssS0FDTixDQUFDLElBQUssTUFFVkMsaUJBQWtCLENBQ2QsQ0FBRUMsS0FBTSxJQUFLQyxNQUFPLEtBQ3BCLENBQUVELEtBQU0sSUFBS0MsTUFBTyxLQUNwQixDQUFFRCxLQUFNLElBQUtDLE1BQU8sS0FDcEIsQ0FBRUQsS0FBTSxJQUFLQyxNQUFPLE1BRXhCQyxpQkFBa0IsQ0FDZCxDQUFFRixLQUFNLElBQUtDLE1BQU8sS0FDcEIsQ0FBRUQsS0FBTSxJQUFLQyxNQUFPLEtBQ3BCLENBQUVELEtBQU0sSUFBS0MsTUFBTyxLQUNwQixDQUFFRCxLQUFNLElBQUtDLE1BQU8sT0FHakJFLEVBQVcsQ0FDbEJDLGFBQWMsR0FDZEMsWUFBWSxFQUNaQyxhQUFjLFVBQ2RSLFNBQVUsQ0FDTixDQUFFRSxLQUFNLElBQUtDLE1BQU8sSUFBS00sTUFBTyx5QkFDaEMsQ0FBRVAsS0FBTSxJQUFLQyxNQUFPLElBQUtNLE1BQU8sbUJBQ2hDLENBQUVQLEtBQU0sSUFBS0MsTUFBTyxJQUFLTSxNQUFPLHFCQUVwQ0MsU0FBVSxDQUNOLE9BQ0EsS0FDQSxNQUNBLE9BQ0EsS0FDQSxPQUNBLE9BQ0EsT0FDQSxNQUNBLE1BQ0EsT0FDQSxTQUNBLFVBQ0EsZUFDQSxTQUNBLE9BQ0EsUUFDQSxPQUNBLFNBQ0EsT0FDQSxRQUNBLFVBQ0EsUUFFSkMsVUFBVyxDQUFDLEtBQU0sTUFDbEJDLFVBQVcsQ0FBQyxNQUFPLE9BQVEsU0FBVSxNQUFPLEtBQU0sTUFBTyxTQUN6REMsVUFBVyxDQUNQQyxLQUFNLENBQ0YsQ0FBQyx3QkFBeUIsY0FDMUIsQ0FBQywyQ0FBNEMsZ0JBQzdDLENBQ0kseUVBQ0EsQ0FBQyxVQUFXLFFBQVMsYUFFekIsQ0FBRUMsUUFBUyxlQUNYLENBQUVBLFFBQVMsWUFDWCxDQUNJLGtDQUNBLENBQ0lDLE1BQU8sQ0FDSCxZQUFhLFVBQ2IsYUFBYyxXQUNkLGFBQWMsWUFDZCxXQUFZLGlCQUs1QkMsUUFBUyxDQUNMLENBQUMsVUFBVyxXQUNaLENBQUMsTUFBTyxVQUFXLFNBQ25CLENBQUMsTUFBTyxVQUFXLFFBQ25CLENBQUMsUUFBUyxZQUVkQyxXQUFZLENBQ1IsQ0FBQyxhQUFjLFNBQ2YsQ0FBQyxNQUFPLFVBQVcsWUFDbkIsQ0FBQyxPQUFRLFlBRWJDLFFBQVMsQ0FDTCxDQUFDLEtBQU0sU0FBVSxXQUNqQixDQUFDLFNBQVUsU0FBVSxxQkFFekJDLGdCQUFpQixDQUNiLENBQUMsV0FBWSxTQUFVLFdBQ3ZCLENBQUMsVUFBVyxVQUNaLENBQUMsTUFBTyxpQkFDUixDQUFDLElBQUssU0FBVSxXQUNoQixDQUFDLE1BQU8sWSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpcWwtZWRpdG9yLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9zY2hlbWUvc2NoZW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IHZhciBjb25mID0ge1xuICAgIGNvbW1lbnRzOiB7XG4gICAgICAgIGxpbmVDb21tZW50OiAnOycsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycjfCcsICd8IyddXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJygnLCAnKSddLFxuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfVxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH1cbiAgICBdXG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLnNjaGVtZScsXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScsIHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJyB9LFxuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JywgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCB0b2tlbjogJ2RlbGltaXRlci5zcXVhcmUnIH1cbiAgICBdLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdjYXNlJyxcbiAgICAgICAgJ2RvJyxcbiAgICAgICAgJ2xldCcsXG4gICAgICAgICdsb29wJyxcbiAgICAgICAgJ2lmJyxcbiAgICAgICAgJ2Vsc2UnLFxuICAgICAgICAnd2hlbicsXG4gICAgICAgICdjb25zJyxcbiAgICAgICAgJ2NhcicsXG4gICAgICAgICdjZHInLFxuICAgICAgICAnY29uZCcsXG4gICAgICAgICdsYW1iZGEnLFxuICAgICAgICAnbGFtYmRhKicsXG4gICAgICAgICdzeW50YXgtcnVsZXMnLFxuICAgICAgICAnZm9ybWF0JyxcbiAgICAgICAgJ3NldCEnLFxuICAgICAgICAncXVvdGUnLFxuICAgICAgICAnZXZhbCcsXG4gICAgICAgICdhcHBlbmQnLFxuICAgICAgICAnbGlzdCcsXG4gICAgICAgICdsaXN0PycsXG4gICAgICAgICdtZW1iZXI/JyxcbiAgICAgICAgJ2xvYWQnXG4gICAgXSxcbiAgICBjb25zdGFudHM6IFsnI3QnLCAnI2YnXSxcbiAgICBvcGVyYXRvcnM6IFsnZXE/JywgJ2Vxdj8nLCAnZXF1YWw/JywgJ2FuZCcsICdvcicsICdub3QnLCAnbnVsbD8nXSxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgWy8jW3hYb09iQl1bMC05YS1mQS1GXSsvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy9bKy1dP1xcZCsoPzooPzpcXC5cXGQqKT8oPzpbZUVdWystXT9cXGQrKT8pPy8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvKD86XFxiKD86KGRlZmluZXxkZWZpbmUtc3ludGF4fGRlZmluZS1tYWNybykpXFxiKShcXHMrKSgoPzpcXHd8XFwtfFxcIXxcXD8pKikvLFxuICAgICAgICAgICAgICAgIFsna2V5d29yZCcsICd3aGl0ZScsICd2YXJpYWJsZSddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAc3RyaW5ncycgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvW2EtekEtWl8jXVthLXpBLVowLTlfXFwtXFw/XFwhXFwqXSovLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGNvbnN0YW50cyc6ICdjb25zdGFudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdvcGVyYXRvcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2lkZW50aWZpZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXHwjXSsvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy8jXFx8LywgJ2NvbW1lbnQnLCAnQHB1c2gnXSxcbiAgICAgICAgICAgIFsvXFx8Iy8sICdjb21tZW50JywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcfCNdLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnd2hpdGUnXSxcbiAgICAgICAgICAgIFsvI1xcfC8sICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbLzsuKiQvLCAnY29tbWVudCddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgICAgIFsvXCIkLywgJ3N0cmluZycsICdAcG9wYWxsJ10sXG4gICAgICAgICAgICBbL1wiKD89LikvLCAnc3RyaW5nJywgJ0BtdWx0aUxpbmVTdHJpbmcnXVxuICAgICAgICBdLFxuICAgICAgICBtdWx0aUxpbmVTdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcXCJdKyQvLCAnc3RyaW5nJywgJ0Bwb3BhbGwnXSxcbiAgICAgICAgICAgIFsvW15cXFxcXCJdKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcnLCAnQHBvcGFsbCddLFxuICAgICAgICAgICAgWy9cXFxcJC8sICdzdHJpbmcnXVxuICAgICAgICBdXG4gICAgfVxufTtcbiJdLCJuYW1lcyI6WyJjb25mIiwiY29tbWVudHMiLCJsaW5lQ29tbWVudCIsImJsb2NrQ29tbWVudCIsImJyYWNrZXRzIiwiYXV0b0Nsb3NpbmdQYWlycyIsIm9wZW4iLCJjbG9zZSIsInN1cnJvdW5kaW5nUGFpcnMiLCJsYW5ndWFnZSIsImRlZmF1bHRUb2tlbiIsImlnbm9yZUNhc2UiLCJ0b2tlblBvc3RmaXgiLCJ0b2tlbiIsImtleXdvcmRzIiwiY29uc3RhbnRzIiwib3BlcmF0b3JzIiwidG9rZW5pemVyIiwicm9vdCIsImluY2x1ZGUiLCJjYXNlcyIsImNvbW1lbnQiLCJ3aGl0ZXNwYWNlIiwic3RyaW5ncyIsIm11bHRpTGluZVN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=