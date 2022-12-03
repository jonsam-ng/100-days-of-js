import{_ as s,c as a,o as n,a as e}from"./app.52d2fe99.js";const y=JSON.parse('{"title":"V8 \u4E4B\u65C5\uFF1AFull Compiler","description":"","frontmatter":{},"headers":[],"relativePath":"WEB/\u8FDB\u51FB\u7684V8/03-V8 \u4E4B\u65C5:Full Compiler.md","lastUpdated":1670043312000}'),l={name:"WEB/\u8FDB\u51FB\u7684V8/03-V8 \u4E4B\u65C5:Full Compiler.md"},p=e(`<h1 id="v8-\u4E4B\u65C5-full-compiler" tabindex="-1">V8 \u4E4B\u65C5\uFF1AFull Compiler <a class="header-anchor" href="#v8-\u4E4B\u65C5-full-compiler" aria-hidden="true">#</a></h1><h2 id="\u76EE\u5F55" tabindex="-1">\u76EE\u5F55 <a class="header-anchor" href="#\u76EE\u5F55" aria-hidden="true">#</a></h2><nav class="table-of-contents"><ul><li><a href="#\u76EE\u5F55">\u76EE\u5F55</a></li><li><a href="#\u5168\u5C40\u67B6\u6784">\u5168\u5C40\u67B6\u6784</a></li><li><a href="#\u5B57\u8282\u7801\u548C\u539F\u751F\u4EE3\u7801\u7684\u533A\u522B">\u5B57\u8282\u7801\u548C\u539F\u751F\u4EE3\u7801\u7684\u533A\u522B</a></li><li><a href="#\u4E3A\u4F55\u6CA1\u6709\u5B57\u8282\u7801">\u4E3A\u4F55\u6CA1\u6709\u5B57\u8282\u7801\uFF1F</a></li><li><a href="#\u5185\u8054\u7F13\u5B58-\u52A0\u901F\u672A\u4F18\u5316\u4EE3\u7801">\u5185\u8054\u7F13\u5B58\uFF1A\u52A0\u901F\u672A\u4F18\u5316\u4EE3\u7801</a></li><li><a href="#\u5F85\u7EED">\u5F85\u7EED\u2026</a></li><li><a href="#\u53C2\u8003">\u53C2\u8003</a></li></ul></nav><p>\u5728\u8FC7\u53BB\u7684\u4E94\u5E74\u4E2D\uFF0CJavaScript \u7684\u6027\u80FD\u6709\u4E86\u6781\u5927\u7684\u63D0\u5347\uFF0C\u8FD9\u4E3B\u8981\u5F52\u529F\u4E8E JavaScript \u865A\u62DF\u673A\u7684\u6267\u884C\u673A\u5236\u7531\u89E3\u91CA\uFF08interpretation\uFF09\u6F14\u53D8\u4E3A\u4E86 JIT\uFF08JIT compilation\uFF09\u3002\u73B0\u5728\uFF0CJavaScript \u6210\u4E3A\u4E86 HTML5 \u7684\u4E2D\u575A\u529B\u91CF\uFF0C\u63A8\u52A8\u7740\u65B0\u4E00\u6CE2 Web \u6280\u672F\u7684\u53D1\u5C55\u3002JavaScript \u5F15\u64CE\u4E2D\uFF0CV8 \u662F\u6700\u65E9\u4F7F\u7528\u539F\u751F\u4EE3\u7801\uFF08native code\uFF09\u7684\u5F15\u64CE\u4E4B\u4E00\u3002V8 \u73B0\u5DF2\u6210\u4E3A\u4E86 Google Chrome\u3001Android \u6D4F\u89C8\u5668\u3001WebOS \u53CA Node.js \u8FD9\u6837\u7684\u5176\u4ED6\u9879\u76EE\u4E2D\u4E0D\u53EF\u5206\u5272\u7684\u91CD\u8981\u7EC4\u4EF6\u3002</p><p>\u4E00\u5E74\u591A\u524D\uFF0C\u6211\uFF08\u6307\u7684\u662F\u539F\u4F5C\u8005\uFF09\u8FDB\u5165\u4E86\u6211\u4EEC\u516C\u53F8\u7684\u4E00\u4E2A\u8D1F\u8D23 V8 \u5728\u6211\u4EEC ARM \u4EA7\u54C1\u4E0A\u4F18\u5316\u7684\u56E2\u961F\u3002\u4ECE\u90A3\u65F6\u7B97\u8D77\uFF0C\u7531\u4E8E\u8F6F\u786C\u4EF6\u6027\u80FD\u7684\u63D0\u5347\uFF0C\u6211\u5DF2\u4EB2\u773C\u89C1\u5230 SunSpider \u6027\u80FD\u7FFB\u500D\uFF0CV8 \u6027\u80FD\u6D4B\u8BD5\u63D0\u5347\u8FD1 50%\u3002</p><p>V8 \u662F\u4E00\u4E2A\u975E\u5E38\u6709\u8DA3\u7684\u9879\u76EE\uFF0C\u7136\u800C\u5B83\u7684\u6587\u6863\u5374\u975E\u5E38\u5206\u6563\u3002\u5728\u63A5\u4E0B\u6765\u7684\u51E0\u7BC7\u6587\u7AE0\u4E2D\uFF0C\u6211\u5C06\u5728\u8F83\u9AD8\u7684\u5C42\u9762\u4E0A\u5BF9\u5176\u505A\u4E00\u4E2A\u6982\u8FF0\uFF0C\u5E0C\u671B\u5BF9\u5176\u4ED6\u540C\u6837\u5BF9 VM \u6216\u7F16\u8BD1\u5668\u5185\u90E8\u539F\u7406\u611F\u5174\u8DA3\u7684\u670B\u53CB\u4EEC\u80FD\u6709\u6240\u5E2E\u52A9\u3002</p><h2 id="\u5168\u5C40\u67B6\u6784" tabindex="-1">\u5168\u5C40\u67B6\u6784 <a class="header-anchor" href="#\u5168\u5C40\u67B6\u6784" aria-hidden="true">#</a></h2><p>V8 \u5C06\u6240\u6709 JavaScript \u4EE3\u7801\u7F16\u8BD1\u4E3A\u539F\u751F\u4EE3\u7801\u6267\u884C\uFF0C\u5176\u4E2D\u6CA1\u6709\u4EFB\u4F55\u7684\u89E3\u91CA\u5668\uFF08interpretation\uFF09\u4EE5\u53CA\u5B57\u8282\u7801\uFF08bytecode\uFF09\u53C2\u4E0E\u3002\u7F16\u8BD1\u4EE5\u51FD\u6570\u4E3A\u5355\u4F4D\uFF0C\u4E00\u6B21\u7F16\u8BD1\u4E00\u4E2A\uFF08\u8FD9\u4E0E FireFox VM \u539F\u6709\u7684 TraceMonkey \u5F15\u64CE\u76F8\u53CD\uFF0CTraceMonkey \u4E3A\u8FFD\u8E2A\u5F0F\u7F16\u8BD1\uFF0C\u5E76\u4E0D\u4EE5\u51FD\u6570\u4E3A\u5355\u4F4D\uFF09\u3002\u901A\u5E38\uFF0C\u51FD\u6570\u5728\u521D\u6B21\u8C03\u7528\u4E4B\u524D\u662F\u4E0D\u4F1A\u88AB\u7F16\u8BD1\u7684\uFF0C\u56E0\u6B64\u5982\u679C\u4F60\u5F15\u7528\u4E86\u4E00\u4E2A\u5927\u578B\u7684\u811A\u672C\u5E93\uFF0CVM \u5E76\u4E0D\u4F1A\u82B1\u5927\u91CF\u7684\u65F6\u95F4\u53BB\u7F16\u8BD1\u90A3\u4E9B\u6839\u672C\u6CA1\u7528\u5230\u7684\u90E8\u5206\u3002</p><p>V8 \u5B9E\u9645\u4E0A\u6709\u4E24\u4E2A\u4E0D\u540C\u7684 JavaScript \u7F16\u8BD1\u5668\u3002\u6211\u4E2A\u4EBA\u559C\u6B22\u5C06\u5176\u770B\u4F5C\u4E00\u4E2A\u7B80\u5355\u7F16\u8BD1\u5668\u53CA\u4E00\u4E2A\u8F85\u52A9\u7F16\u8BD1\u5668\uFF08 <em>\u8BD1\u6CE8\uFF0C\u8FD9\u91CC\u770B\u8D77\u6765\u6CA1\u6709\u4E00\u4E2A\u6B63\u7ECF\u7684\uFF0C\u4F46\u5B9E\u9645\u4E0A\u4E24\u4E2A\u8BCD\u6C47\u63CF\u8FF0\u7684\u65B9\u9762\u4E0D\u540C\u3002\u524D\u8005\u6307\u7684\u662F\u673A\u5236\u7B80\u5355\u7684\u7F16\u8BD1\u5668\uFF0C\u540E\u8005\u6307\u7684\u662F\u4F7F\u7528\u9891\u5EA6\u4F4E\u7684\u7F16\u8BD1\u5668\u3002</em> \uFF09\u3002Full Compiler\uFF08<em>\u5BF9\u5E94\u7B80\u5355\u7F16\u8BD1\u5668</em>\uFF09\u662F\u4E00\u4E2A\u4E0D\u542B\u4F18\u5316\u7684\u7F16\u8BD1\u5668\uFF0C\u5176\u5DE5\u4F5C\u5C31\u662F\u5C3D\u5FEB\u751F\u6210\u539F\u751F\u4EE3\u7801\uFF0C\u4EE5\u4FDD\u6301\u9875\u9762\u59CB\u7EC8\u5FEB\u901F\u8FD0\u8F6C\u3002Crankshaft\uFF08<em>\u5BF9\u5E94\u8F85\u52A9\u7F16\u8BD1\u5668</em>\uFF09\u5219\u662F\u4E00\u4E2A\u5E26\u6709\u4F18\u5316\u80FD\u529B\u7684\u7F16\u8BD1\u5668\u3002V8 \u4F1A\u5C06\u4EFB\u4F55\u521D\u6B21\u9047\u5230\u7684\u4EE3\u7801\u4F7F\u7528 FC \u7F16\u8BD1\uFF0C\u4E4B\u540E\u518D\u4F7F\u7528\u5185\u7F6E\u7684\u6027\u80FD\u5206\u6790\u5668\u6311\u9009\u9891\u5EA6\u9AD8\u7684\u51FD\u6570\uFF0C\u4F7F\u7528 Crankshaft \u4F18\u5316\u3002\u7531\u4E8E V8 \u57FA\u672C\u4E0A\u662F\u5355\u7EBF\u7A0B\u7684\uFF08\u622A\u81F3 3.14 \u7248\uFF09\uFF0C\u4EFB\u4F55\u4E00\u4E2A\u7F16\u8BD1\u5668\u8FD0\u884C\u65F6\uFF0C\u90FD\u4F1A\u6253\u65AD\u811A\u672C\u7684\u6267\u884C\u3002\u5728 V8 \u672A\u6765\u7684\u7248\u672C\u4E2D\uFF0CCrankshaft\uFF08\u6216\u8005\u81F3\u5C11\u5176\u4E2D\u4E00\u90E8\u5206\uFF09\u5C06\u4F1A\u5728\u4E00\u4E2A\u5355\u72EC\u7684\u7EBF\u7A0B\u4E2D\u8FD0\u884C\uFF0C\u4E0E JavaScript \u7684\u6267\u884C\u5E76\u53D1\uFF0C\u4EE5\u4FBF\u8FDB\u884C\u66F4\u591A\u6602\u8D35\u7684\u4F18\u5316\u3002</p><h2 id="\u5B57\u8282\u7801\u548C\u539F\u751F\u4EE3\u7801\u7684\u533A\u522B" tabindex="-1">\u5B57\u8282\u7801\u548C\u539F\u751F\u4EE3\u7801\u7684\u533A\u522B <a class="header-anchor" href="#\u5B57\u8282\u7801\u548C\u539F\u751F\u4EE3\u7801\u7684\u533A\u522B" aria-hidden="true">#</a></h2><p>\u539F\u751F\u4EE3\u7801\u662F\u8BA1\u7B97\u673A\u7F16\u7A0B\uFF08\u4EE3\u7801\uFF09\uFF0C\u5B83\u88AB\u7F16\u8BD1\u4E3A\u4F7F\u7528\u7279\u5B9A\u7684\u5904\u7406\u5668\uFF08\u5982\u82F1\u7279\u5C14 x86 \u7EA7\u5904\u7406\u5668\uFF09\u53CA\u5176\u6307\u4EE4\u96C6\u8FD0\u884C\u3002\u539F\u751F\u4EE3\u7801\u662F\u4E00\u79CD\u53EF\u6267\u884C\u4EE3\u7801\uFF0C\u5B83\u76F4\u63A5\u5728\u673A\u5668\u4E0A\u8FD0\u884C\uFF0C\u4E0D\u4F9D\u8D56\u4E8E\u4EFB\u4F55\u89E3\u91CA\u5668\u3002\u5B83\u53EF\u4EE5\u5B8C\u5168\u81EA\u7531\u5730\u8BBF\u95EE\u4EFB\u4F55\u5185\u5B58\u533A\u57DF\uFF08\u81F3\u5C11\u662F\u5728\u8FDB\u7A0B\u5185\u5B58\u7A7A\u95F4\u5185\uFF09\u3002</p><p>\u5B57\u8282\u7801\u662F\u88AB\u7BA1\u7406\u7684\u4EE3\u7801\uFF0C\u7531 CLR\uFF08\u901A\u7528\u8BED\u8A00\u8FD0\u884C\u65F6\uFF0CCommon Language Runtime\uFF09\u5185\u7684\u865A\u62DF\u673A\u6267\u884C\u3002\u865A\u62DF\u673A\u662F\u4E00\u4E2A\u7A0B\u5E8F\uFF0C\u5B83\u5C06\u5E73\u53F0\u901A\u7528\u7684\u5B57\u8282\u7801\u8F6C\u6362\u4E3A\u5C06\u5728\u7279\u5B9A\u5904\u7406\u5668\u4E2D\u8FD0\u884C\u7684\u672C\u5730\u4EE3\u7801\u3002</p><p>\u53C2\u8003\uFF1A</p><ul><li><a href="https://www.quora.com/What-is-the-difference-between-native-code-C-and-bytecode-Java/answer/Sekhar-242?ch=10&amp;oid=69601574&amp;share=f8908df9&amp;target_type=answer" target="_blank" rel="noreferrer">What is the difference between native code (C) and bytecode (Java)? - Quora</a></li><li><a href="https://www.geeksforgeeks.org/difference-between-byte-code-and-machine-code/" target="_blank" rel="noreferrer">Difference between Byte Code and Machine Code - GeeksforGeeks</a></li></ul><h2 id="\u4E3A\u4F55\u6CA1\u6709\u5B57\u8282\u7801" tabindex="-1">\u4E3A\u4F55\u6CA1\u6709\u5B57\u8282\u7801\uFF1F <a class="header-anchor" href="#\u4E3A\u4F55\u6CA1\u6709\u5B57\u8282\u7801" aria-hidden="true">#</a></h2><p>\u5927\u591A\u6570 VM \u90FD\u6709\u4E00\u4E2A\u5B57\u8282\u7801\u89E3\u91CA\u5668\uFF0C\u4F46 V8 \u5374\u6CA1\u6709\u3002\u4F60\u53EF\u80FD\u597D\u5947\u4E3A\u4F55\u539F\u672C\u5E94\u5F53\u5148\u7F16\u8BD1\u4E3A\u5B57\u8282\u7801\u518D\u6267\u884C\u7684\u8FC7\u7A0B\uFF0C\u88AB FC \u66FF\u6362\u6389\u4E86\u3002\u539F\u56E0\u662F\uFF0C\u7F16\u8BD1\u4E3A\u539F\u751F\u4EE3\u7801\u5E76\u4E0D\u4F1A\u6BD4\u7F16\u8BD1\u4E3A\u5B57\u8282\u7801\u8017\u53BB\u592A\u591A\u3002\u8003\u8651\u5982\u4E0B\u4E24\u4E2A\u8FC7\u7A0B\uFF1A</p><p>\u5B57\u8282\u7801\u7F16\u8BD1\uFF1A</p><ul><li>\u8BED\u6CD5\u5206\u6790\uFF08\u89E3\u6790\uFF09</li><li>\u4F5C\u7528\u57DF\u5206\u6790</li><li>\u5C06\u8BED\u6CD5\u6811\u8F6C\u6362\u4E3A\u5B57\u8282\u7801</li></ul><p>\u539F\u751F\u4EE3\u7801\u7F16\u8BD1\uFF1A</p><ul><li>\u8BED\u6CD5\u5206\u6790\uFF08\u89E3\u6790\uFF09</li><li>\u4F5C\u7528\u57DF\u5206\u6790</li><li>\u5C06\u8BED\u6CD5\u6811\u8F6C\u6362\u4E3A\u539F\u751F\u4EE3\u7801</li></ul><p>\u5728\u4E0A\u8FF0\u4E24\u4E2A\u8FC7\u7A0B\u4E2D\uFF0C\u6211\u4EEC\u90FD\u9700\u8981\u89E3\u6790\u6E90\u7801\u4EE5\u53CA\u751F\u6210\u62BD\u8C61\u8BED\u6CD5\u6811\uFF08AST\uFF09\uFF0C\u6211\u4EEC\u90FD\u9700\u8981\u8FDB\u884C\u4F5C\u7528\u57DF\u5206\u6790\uFF0C\u4EE5\u4FBF\u5F97\u51FA\u6BCF\u4E2A\u7B26\u53F7\u6240\u4EE3\u8868\u7684\u662F\u5C40\u90E8\u53D8\u91CF\uFF0C\u4E0A\u4E0B\u6587\u53D8\u91CF\uFF08\u95ED\u5305\u76F8\u5173\uFF09\u6216\u5168\u5C40\u53D8\u91CF\u3002\u552F\u72EC\u8F6C\u6362\u7684\u8FC7\u7A0B\u662F\u4E0D\u540C\u7684\u3002\u4F60\u53EF\u4EE5\u5728\u8FD9\u4E00\u6B65\u505A\u4E00\u4E9B\u975E\u5E38\u7EC6\u81F4\u7684\u5DE5\u4F5C\uFF0C\u4F46\u4F60\u4E5F\u540C\u65F6\u5E0C\u671B\u7F16\u8BD1\u5668\u8D8A\u5FEB\u8D8A\u597D\uFF0C\u751A\u81F3\u5F88\u60F3\u6765\u4E2A \u201C\u76F4\u8BD1\u201D\uFF1A\u8BED\u6CD5\u6811\u7684\u6BCF\u4E2A\u8282\u70B9\u90FD\u8F6C\u5316\u4E3A\u4E00\u4E32\u76F8\u5E94\u7684\u5B57\u8282\u7801\u6216\u539F\u751F\u4EE3\u7801\u6307\u4EE4\uFF08<em>\u8BD1\u6CE8\uFF0C\u6C47\u7F16\u6307\u4EE4</em>\uFF09\u3002</p><p>\u73B0\u5728\u601D\u8003\u4E00\u4E0B\u4F60\u4F1A\u5982\u4F55\u53BB\u505A\u4E00\u4E2A\u5B57\u8282\u7801\u89E3\u91CA\u5668\u3002\u4E00\u4E2A\u6734\u7D20\u7684\u5B9E\u73B0\u53EF\u80FD\u5C31\u662F\u4E00\u4E2A\u5FAA\u73AF\uFF0C\u5176\u4E2D\u4F1A\u4E0D\u65AD\u83B7\u53D6\u5B57\u8282\u7801\uFF0C\u7136\u540E\u8FDB\u5165\u4E00\u4E2A\u5927\u7684 <code>switch</code> \u8BED\u53E5\uFF0C\u9010\u4E00\u6267\u884C\u5176\u4E8B\u5148\u51C6\u5907\u597D\u7684\u6307\u4EE4\u3002<a href="http://wingolog.org/archives/2012/06/27/inside-javascriptcores-low-level-interpreter" target="_blank" rel="noreferrer">\u6709\u4E00\u4E9B\u9014\u5F84</a>\u5BF9\u8FD9\u4E2A\u8FC7\u7A0B\u8FDB\u884C\u6539\u8FDB\uFF0C\u4F46\u6700\u7EC8\u8FD8\u662F\u4F1A\u843D\u5230\u76F8\u8FD1\u7684\u7ED3\u6784\u4E0A\u3002</p><p>\u5982\u679C\u6211\u4EEC\u6B64\u65F6\u4E0D\u662F\u53BB\u751F\u6210\u5B57\u8282\u7801\u3001\u4F7F\u7528\u89E3\u91CA\u5668\u7684\u90A3\u4E2A\u5FAA\u73AF\uFF0C\u800C\u662F\u76F4\u63A5\u89E6\u53D1\u76F8\u5E94\u7684\u539F\u751F\u4EE3\u7801\u5462\uFF1F\u65E0\u9700\u5982\u679C\uFF0CV8 \u7684 FC \u5C31\u662F\u8FD9\u6837\u505A\u7684\u3002\u8FD9\u6837\u505A\u4FBF\u4E0D\u518D\u9700\u8981\u89E3\u91CA\u5668\uFF0C\u5E76\u4E14\u5927\u5927\u7B80\u5316\u4E86\u672A\u4F18\u5316\u4EE3\u7801\u4E0E\u4F18\u5316\u4EE3\u7801\u4E4B\u95F4\u7684\u5207\u6362\u3002</p><p>\u4E00\u822C\u6765\u8BF4\uFF0C\u5B57\u8282\u7801\u53D1\u6325\u7528\u6B66\u4E4B\u5730\u7684\u6700\u4F73\u65F6\u673A\uFF0C\u662F\u7F16\u8BD1\u5668\u6709\u5145\u5206\u7684\u51C6\u5907\u65F6\u95F4\u7684\u65F6\u5019\u3002\u4F46\u8FD9\u5E76\u4E0D\u662F\u6D4F\u89C8\u5668\u4E2D\u6240\u80FD\u5141\u8BB8\u7684\uFF0C\u56E0\u6B64 FC \u5BF9\u4E8E V8 \u6765\u8BF4\u66F4\u52A0\u5E94\u666F\u3002</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u62BD\u8C61\u8BED\u6CD5\u6811\u5230\u5B57\u8282\u7801\u7684\u8FC7\u7A0B\u5B9E\u9645\u4E0A\u662F\u6709\u7684\uFF0C\u539F\u6587\u5199\u4E8E 2012 \u5E74\uFF0C\u751F\u6210\u5B57\u8282\u7801\u8FD9\u4E00\u6B65\u5728 2017 \u5E74\u4EE5\u524D\u662F\u6CA1\u6709\u7684\u3002V8 \u7684\u89E3\u91CA\u5668<strong> Ignition</strong> \u4ECE\u62BD\u8C61\u8BED\u6CD5\u6811\u751F\u6210\u5B57\u8282\u7801\u3002\u53C2\u89C1\uFF1A<a href="/WEB/\u8FDB\u51FB\u7684V8/08-JavaScript\u5DE5\u4F5C\u539F\u7406:V8\u7F16\u8BD1\u5668\u7684\u4F18\u5316\u63D0\u6548">JavaScript \u5DE5\u4F5C\u539F\u7406\uFF1AV8 \u7F16\u8BD1\u5668\u7684\u4F18\u5316\u63D0\u6548</a></p></div><h2 id="\u5185\u8054\u7F13\u5B58-\u52A0\u901F\u672A\u4F18\u5316\u4EE3\u7801" tabindex="-1">\u5185\u8054\u7F13\u5B58\uFF1A\u52A0\u901F\u672A\u4F18\u5316\u4EE3\u7801 <a class="header-anchor" href="#\u5185\u8054\u7F13\u5B58-\u52A0\u901F\u672A\u4F18\u5316\u4EE3\u7801" aria-hidden="true">#</a></h2><p>\u5982\u679C\u4F60\u770B\u8FC7 ECMAScript \u6807\u51C6\uFF0C\u4F60\u4F1A\u53D1\u73B0\u5176\u4E2D\u6709\u5F88\u591A\u64CD\u4F5C\u5F02\u5E38\u590D\u6742\u3002\u4EE5 <code>+</code> \u64CD\u4F5C\u7B26\u6765\u8BF4\uFF0C\u5982\u679C\u64CD\u4F5C\u6570\u90FD\u4E3A\u6570\u5B57\uFF0C\u5219\u5B83\u6F14\u7ECE\u4E3A\u52A0\u6CD5\uFF1B\u5982\u679C\u5176\u4E2D\u6709\u4E00\u4E2A\u64CD\u4F5C\u6570\u662F\u5B57\u7B26\u4E32\uFF0C\u5219\u5B83\u6F14\u7ECE\u4E3A\u5B57\u7B26\u4E32\u62FC\u63A5\uFF1B\u5982\u679C\u64CD\u4F5C\u6570\u4E0D\u662F\u6570\u5B57\u4E5F\u4E0D\u662F\u5B57\u7B26\u4E32\uFF0C\u5176\u5C06\u7ECF\u8FC7\u67D0\u4E9B\u590D\u6742\u7684\uFF08\u53EF\u80FD\u662F\u7528\u6237\u5B9A\u4E49\u7684\uFF09\u8FC7\u7A0B\uFF0C\u8F6C\u5316\u4E3A\u539F\u8BED\uFF08 <em>\u8BD1\u6CE8\uFF0C\u539F\u8BED\u6307\u7684\u662F JavaScript \u4E2D\u7684\u6570\u5B57\u3001\u5B57\u7B26\u4E32\u3001\u5E03\u5C14\u3001 <code>undefined</code> \u4EE5\u53CA <code>null</code></em> \uFF09\uFF0C\u6700\u7EC8\u518D\u6F14\u7ECE\u4E3A\u6570\u5B57\u52A0\u6CD5\u6216\u5B57\u7B26\u4E32\u62FC\u63A5\u3002\u4EC5\u4EC5\u662F\u67E5\u770B\u811A\u672C\u6E90\u7801\uFF0C\u6211\u4EEC\u65E0\u4ECE\u5F97\u77E5\u54EA\u79CD\u64CD\u4F5C\u6700\u7EC8\u5E94\u5F53\u6267\u884C\u3002\u5C5E\u6027\u7684\u8BFB\u53D6\uFF08\u6BD4\u5982\uFF1A <code>o.x</code> \uFF09\u662F\u53E6\u4E00\u4E2A\u6F5C\u5728\u590D\u6742\u64CD\u4F5C\u7684\u4F8B\u5B50\u3002\u53EA\u901A\u8FC7\u6E90\u7801\uFF0C\u4F60\u5C06\u65E0\u4ECE\u5F97\u77E5\u4F60\u8981\u7684\u662F\u8BFB\u53D6\u4E00\u4E2A\u5BF9\u8C61\u81EA\u5DF1\u7684\u5C5E\u6027\uFF08\u5BF9\u8C61\u672C\u8EAB\u6240\u5177\u6709\u7684\u5C5E\u6027\uFF09\uFF0C\u8FD8\u662F\u539F\u578B\u5BF9\u8C61\u7684\u5C5E\u6027\uFF08\u6765\u81EA\u4E8E\u539F\u578B\u94FE\u4E0A\u539F\u578B\u7684\u5C5E\u6027\uFF09\uFF0C\u8FD8\u662F\u4E00\u4E2A <code>getter</code> \u65B9\u6CD5\uFF0C\u4EA6\u6216\u662F\u6D4F\u89C8\u5668\u7684\u67D0\u4E9B\u81EA\u5B9A\u4E49\u56DE\u8C03\u3002\u8FD9\u4E2A\u5C5E\u6027\u8FD8\u53EF\u80FD\u6839\u672C\u4E0D\u5B58\u5728\u3002\u5982\u679C\u4F60\u8981\u5728 FC \u7F16\u8BD1\u7684\u4EE3\u7801\u4E2D\u5904\u7406\u6240\u6709\u8FD9\u4E9B\u60C5\u51B5\uFF0C\u5373\u4F7F\u4E00\u4E2A\u7B80\u5355\u7684\u64CD\u4F5C\u4E5F\u4F1A\u5F15\u53D1\u4E0A\u767E\u6761\u6307\u4EE4\u3002</p><p>\u5185\u8054\u7F13\u5B58\uFF08Inline caches\uFF0C ICs\uFF09\u63D0\u4F9B\u4E86\u4E00\u4E2A\u4F18\u96C5\u7684\u65B9\u6848\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u3002\u5185\u8054\u7F13\u5B58\u5927\u81F4\u5C31\u662F\u4E00\u4E2A\u5305\u542B\u591A\u79CD\u53EF\u80FD\u7684\u5B9E\u73B0\uFF08\u901A\u5E38\u8FD0\u884C\u65F6\u751F\u6210\uFF09\u6765\u5904\u7406\u67D0\u4E2A\u64CD\u4F5C\u7684\u51FD\u6570\uFF08 <em>\u8BD1\u6CE8\uFF1A\u62D7\u53E3\uFF0C\u6211\u7684\u7406\u89E3\u662F\uFF0C\u8FD9\u4E2A\u51FD\u6570\u63D0\u4F9B\u4E86\u591A\u4E2A\u5904\u7406\u95EE\u9898\u7684\u65B9\u6848\uFF0C\u8FD9\u4E9B\u65B9\u6848\u7684\u6027\u80FD\u7531\u4F18\u81F3\u6B21\uFF0C\u4E00\u4E2A\u4E0D\u884C\u5C31\u9000\u5316\u5230\u53E6\u4E00\u4E2A\uFF0C\u76F4\u81F3\u6700\u7EC8\u6700\u4F4E\u6548\u7387\u7684\u65B9\u6CD5</em> \uFF09\u3002\u6211<a href="http://jayconrod.com/posts/44/polymorphic-inline-caches-explained" target="_blank" rel="noreferrer">\u4E4B\u524D\u66FE\u5199\u8FC7</a>\u51FD\u6570\u7684\u591A\u6001\u5185\u8054\u7F13\u5B58\u7684\u6587\u7AE0\u3002V8 \u4F7F\u7528 IC \u5904\u7406\u4E86\u5927\u91CF\u7684\u64CD\u4F5C\uFF1AFC \u4F7F\u7528 IC \u6765\u5B9E\u73B0\u8BFB\u53D6\u3001\u5B58\u50A8\u3001\u51FD\u6570\u8C03\u7528\u3001\u4E8C\u5143\u8FD0\u7B97\u7B26\u3001\u4E00\u5143\u8FD0\u7B97\u7B26\u3001\u6BD4\u8F83\u8FD0\u7B97\u7B26\u4EE5\u53CA <code>ToBoolean</code> \u9690\u64CD\u4F5C\u7B26\u3002</p><p>IC \u7684\u5B9E\u73B0\u79F0\u4E3A Stub\u3002Stub \u5728\u4F7F\u7528\u5C42\u9762\u4E0A\u50CF\u51FD\u6570\uFF1A\u8C03\u7528\u3001\u8FD4\u56DE\u3002\u4F46\u5B83\u4E0D\u5FC5\u521D\u59CB\u5316\u4E00\u4E2A\u8C03\u7528\u6808\u6765\u5B8C\u6210\u8C03\u7528\u7EA6\u5B9A\u3002Stub \u5E38\u5E38\u5728\u8FD0\u884C\u65F6\u52A8\u6001\u751F\u6210\uFF0C\u4F46\u5728\u901A\u5E38\u60C5\u51B5\u4E0B\u90FD\u53EF\u88AB\u7F13\u5B58\uFF0C\u5E76\u88AB\u591A\u4E2A IC \u91CD\u7528\u3002Stub \u4E00\u822C\u4F1A\u542B\u6709\u5DF2\u4F18\u5316\u7684\u4EE3\u7801\uFF0C\u6765\u5904\u7406\u67D0\u4E2A IC \u4E4B\u524D\u6240\u78B0\u5230\u7684\u7279\u5B9A\u7C7B\u578B\u7684\u64CD\u4F5C\u3002\u4E00\u65E6 Stub \u78B0\u5230\u4E86\u4F18\u5316\u4EE3\u7801\u65E0\u6CD5\u89E3\u51B3\u7684\u64CD\u4F5C\uFF0C\u5B83\u4F1A\u8C03\u7528 C++ \u8FD0\u884C\u65F6\u4EE3\u7801\u6765\u8FDB\u884C\u5904\u7406\u3002\u8FD0\u884C\u65F6\u4EE3\u7801\u5904\u7406\u4E86\u8FD9\u4E2A\u64CD\u4F5C\u4E4B\u540E\uFF0C\u4F1A\u751F\u6210\u4E00\u4E2A\u65B0\u7684 Stub\uFF0C\u5305\u542B\u89E3\u51B3\u8FD9\u4E2A\u64CD\u4F5C\u7684\u65B9\u6848\uFF08\u5F53\u7136\u4E5F\u5305\u62EC\u4E4B\u524D\u7684\u5176\u4ED6\u65B9\u6848\uFF09\u3002\u5BF9\u539F\u6709 Stub \u7684\u8C03\u7528\u968F\u5373\u53D8\u4E3A\u4E86\u65B0 Stub \u7684\u8C03\u7528\uFF0C\u811A\u672C\u7684\u6267\u884C\u4E5F\u5C06\u7EE7\u7EED\u8FDB\u884C\uFF0C\u53D8\u5F97\u548C Stub \u6B63\u5E38\u7684\u8C03\u7528\u6D41\u7A0B\u4E00\u6837\u3002</p><p>\u6211\u4EEC\u6765\u770B\u4E00\u6BB5\u7B80\u5355\u7684\u4F8B\u5B50\uFF0C\u8BFB\u53D6\u5C5E\u6027\uFF1A</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">f</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">o</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">o</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5F53 FC \u521D\u6B21\u751F\u6210\u4EE3\u7801\u65F6\uFF0C\u5B83\u4F1A\u4F7F\u7528\u4E00\u4E2A IC \u6765\u6F14\u7ECE\u8FD9\u4E2A\u8BFB\u53D6\u3002IC \u4EE5 uninitialized \u72B6\u6001\uFF08\u521D\u6001\uFF09\u521D\u59CB\uFF0C\u8C03\u7528\u4E00\u4E2A\u4E0D\u5305\u542B\u4EFB\u4F55\u4F18\u5316\u4EE3\u7801\u7684\u7B80\u6613\u7684 Stub\u3002\u4E0B\u9762\u662F FC \u751F\u6210\u7684\u8C03\u7528 stub \u7684\u4EE3\u7801\uFF1A</p><div class="language-asm line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">asm</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">;; FC\u8C03\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   r0, [fp, #+</span><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">]     </span><span style="color:#676E95;">; \u4ECE\u6808\u4E2D\u8BFB\u53D6\u53C2\u6570\u201Do\u201C</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   r2, [pc, #+</span><span style="color:#F78C6C;">84</span><span style="color:#A6ACCD;">]    </span><span style="color:#676E95;">; \u4ECE\u56FA\u5B9A\u7684\u4F4D\u7F6E\u8BFB\u53D6\u201Dx\u201C</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">, [pc, #+</span><span style="color:#F78C6C;">84</span><span style="color:#A6ACCD;">]    </span><span style="color:#676E95;">; \u4ECE\u56FA\u5B9A\u4F4D\u7F6E\u8F7D\u5165uninitialized\u6001\u7684stub</span></span>
<span class="line"><span style="color:#A6ACCD;">blx   </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">                </span><span style="color:#676E95;">; \u8C03\u7528stub</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#C792EA;">dd</span><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">0xabcdef01</span><span style="color:#A6ACCD;">        </span><span style="color:#676E95;">; \u4E0A\u9762\u62FF\u5230\u7684stub\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#676E95;">; \u5F53stub\u51FA\u73B0\u5904\u7406\u4E0D\u4E86\u7684\u64CD\u4F5C\u65F6\uFF0C\u8FD9\u91CC\u7684stub\u4F1A\u88AB\u6362\u6210\u65B0\u7684stub</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\uFF08\u5982\u679C\u4F60\u4E0D\u719F\u6089 ARM \u6C47\u7F16\u7684\u8BDD\uFF0C\u62B1\u6B49\u3002\u5E0C\u671B\u6CE8\u91CA\u80FD\u8BA9\u4EE3\u7801\u7684\u610F\u56FE\u6E05\u6670\uFF09 \u8FD9\u662F\u5904\u4E8E uninitialized \u6001\u7684 stub\uFF1A</p><div class="language-asm line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">asm</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">;; uninitialized stub</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">,  [pc, #</span><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">]   </span><span style="color:#676E95;">; \u8BFB\u53D6C++\u8FD0\u884C\u65F6\u7684\u51FD\u6570\u6765\u5904\u7406</span></span>
<span class="line"><span style="color:#89DDFF;">bx</span><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">              </span><span style="color:#676E95;">; \u5C3E\u8C03\uFF1B\u8BD1\u6CE8\uFF1A\u5C3E\u9012\u5F52\u4F18\u5316\u6280\u672F</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5F53 stub \u7B2C\u4E00\u6B21\u88AB\u8C03\u7528\u65F6\uFF0Cstub \u6CE8\u5B9A\u65E0\u6CD5\u5904\u7406\u5B83\u6240\u9762\u5BF9\u7684\u64CD\u4F5C\uFF0C\u8FD0\u884C\u65F6\u4EE3\u7801\u4F1A\u66FF stub \u6765\u89E3\u51B3\u3002\u5728 V8 \u4E2D\uFF0C\u6700\u5E38\u89C1\u7684\u5B58\u50A8\u5C5E\u6027\u7684\u65B9\u6CD5\u5C31\u662F\u5C06\u5176\u653E\u5728\u5BF9\u8C61\u4E2D\u4E00\u4E2A\u56FA\u5B9A\u504F\u79FB\u91CF\u7684\u5730\u65B9\uFF0C\u6211\u4EEC\u4EE5\u6B64\u4E3A\u4F8B\u3002\u6BCF\u4E2A\u5BF9\u8C61\u90FD\u6709\u4E00\u4E2A\u6307\u5411 Map \u7684\u6307\u9488\uFF0C\u4E5F\u5373\u4E00\u4E2A\u63CF\u8FF0\u5BF9\u8C61\u5E03\u5C40\u7684\u4E00\u4E2A\u4E0D\u53D8\u7ED3\u6784\u3002\u8D1F\u8D23\u8BFB\u53D6\u5BF9\u8C61\u81EA\u8EAB\u5C5E\u6027\u7684 stub \u4F1A\u5C06\u5BF9\u8C61\u7684\u5E03\u5C40\u56FE\u4E0E\u5DF2\u77E5\u7684 Map\uFF08\u4E5F\u5C31\u662F\u8FD0\u884C\u65F6\u6240\u751F\u6210\u7684 Map\uFF09\u76F8\u6BD4\u8F83\uFF0C\u6765\u5FEB\u901F\u786E\u5B9A\u5BF9\u8C61\u662F\u5426\u5728\u76F8\u5E94\u7684\u4F4D\u7F6E\u5B58\u653E\u7740\u8BE5\u5C5E\u6027\u3002\u8FD9\u4E2A Map \u7684\u68C0\u67E5\u4F7F\u6211\u4EEC\u80FD\u591F\u907F\u5F00\u4E00\u6B21\u9EBB\u70E6\u7684 Hash \u8868\u67E5\u8BE2\u3002</p><div class="language-asm line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">asm</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">;; monomorphic\u6001\u7684\u5BF9\u8C61\u81EA\u8EAB\u5C5E\u6027\u8BFB\u53D6stub</span></span>
<span class="line"><span style="color:#A6ACCD;">tst   r0,   #</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;">; \u68C0\u9A8C\u76EE\u6807\u662F\u5426\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF1B\u8BD1\u6CE8\uFF1A\u89C1\u4EE3\u7801\u672B\u8BE6\u7EC6\u8BD1\u6CE8</span></span>
<span class="line"><span style="color:#A6ACCD;">beq   miss              </span><span style="color:#676E95;">; \u4E0D\u662F\u5C31\u8BF4\u660E\u5904\u7406\u4E0D\u4E86</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   r1,   [r0, #-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]   </span><span style="color:#676E95;">; \u8BFB\u53D6\u5BF9\u8C61\u7684Map</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">,   [pc, #+</span><span style="color:#F78C6C;">24</span><span style="color:#A6ACCD;">]  </span><span style="color:#676E95;">; \u8BFB\u53D6\u5DF2\u77E5\u7684Map</span></span>
<span class="line"><span style="color:#89DDFF;">cmp</span><span style="color:#A6ACCD;">   r1,   </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;">; \u5B83\u4EEC\u76F8\u540C\u5426\uFF1F</span></span>
<span class="line"><span style="color:#A6ACCD;">bne   miss              </span><span style="color:#676E95;">; \u4E0D\u540C\u8BF4\u660E\u5904\u7406\u4E0D\u4E86</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   r0,   [r0, #+</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;">]  </span><span style="color:#676E95;">; \u8BFB\u53D6\u5C5E\u6027</span></span>
<span class="line"><span style="color:#89DDFF;">bx</span><span style="color:#A6ACCD;">    lr                </span><span style="color:#676E95;">; \u8FD4\u56DE</span></span>
<span class="line"><span style="color:#82AAFF;">miss</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">ldr   </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">,   [pc, #+</span><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">]   </span><span style="color:#676E95;">; \u8C03\u7528C++\u8FD0\u884C\u65F6\u6765\u89E3\u51B3</span></span>
<span class="line"><span style="color:#89DDFF;">bx</span><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">ip</span><span style="color:#A6ACCD;">                </span><span style="color:#676E95;">; \u5C3E\u8C03</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><em>\u8BD1\u6CE8\uFF1AV8 \u4E2D\u5BF9 32bits \u957F\u7684\u503C\u505A\u4E86\u8FDB\u4E00\u6B65\u5206\u7C7B\uFF0C\u5176\u4E2D\u6700\u4F4E\u4F4D\u4F5C\u4E3A\u533A\u5206\uFF0C\u5982\u679C\u4E3A 0 \u5219\u8868\u793A\u8BE5\u503C\u4E3A 31bits \u957F\u7684\u6574\u6570\uFF1B\u5982\u679C\u4E3A 1 \u5219\u8868\u793A\u8BE5\u503C\u4E3A 30bits \u957F\u7684\u6307\u9488\u3002\u7531\u4E8E V8 \u4E2D\u7684\u5BF9\u8C61\u4EE5 4Bytes \u4E3A\u5355\u4F4D\u5BF9\u9F50\uFF0C\u6307\u9488\u7684\u6700\u4F4E 2 \u4F4D\u6070\u597D\u7A7A\u95F2\u3002</em></p><p>\u53EA\u8981\u8BE5\u8868\u8FBE\u5F0F\u53EA\u8D1F\u8D23\u8BFB\u53D6\u5BF9\u8C61\u81EA\u8EAB\u7684\u5C5E\u6027\uFF0C\u5219\u8BFB\u53D6\u53EF\u4EE5\u65E0\u9644\u52A0\u5730\u5FEB\u901F\u5B8C\u6210\u3002\u7531\u4E8E IC \u53EA\u5904\u7406\u4E86\u4E00\u79CD\u60C5\u51B5\uFF0C\u5B83\u5904\u4E8E monomorphic \u6001\uFF08\u5355\u6001\uFF09\u3002\u5982\u679C\u5728\u540E\u7EED\u7684\u8FD0\u884C\u4E2D\uFF0C\u8FD9\u4E2A IC \u53C8\u9047\u5230\u4E86\u65E0\u6CD5\u5904\u7406\u7684\u60C5\u51B5\uFF0C\u5219\u66F4\u52A0\u5E38\u89C1\u7684 megamorphic \u6001\uFF08\u590D\u6001\uFF09stub \u4F1A\u88AB\u751F\u6210\u3002</p><h2 id="\u5F85\u7EED" tabindex="-1">\u5F85\u7EED\u2026 <a class="header-anchor" href="#\u5F85\u7EED" aria-hidden="true">#</a></h2><p>\u5982\u4E0A\u6240\u8FF0\uFF0CFC \u5706\u6EE1\u5730\u5B8C\u6210\u4E86\u5B83\u5FEB\u901F\u751F\u6210\u4F18\u8D28\u4EE3\u7801\u7684\u4EFB\u52A1\u3002\u7531\u4E8E IC \u6613\u4E8E\u6269\u5C55\u7684\u7279\u70B9\uFF0CFC \u751F\u6210\u7684\u4EE3\u7801\u4E5F\u975E\u5E38\u901A\u7528\uFF0C\u8FD9\u4F7F\u5F97 FC \u975E\u5E38\u7B80\u5355\uFF1B\u800C IC \u5219\u4F7F\u4EE3\u7801\u975E\u5E38\u7075\u6D3B\uFF0C\u80FD\u591F\u5904\u7406\u4EFB\u4F55\u60C5\u51B5\u3002</p><p>\u5728\u63A5\u4E0B\u6765\u7684\u6587\u7AE0\u4E2D\uFF0C\u6211\u4EEC\u5C06\u770B\u5230 V8 \u5185\u90E8\u5982\u4F55\u8868\u8FBE JavaScript \u5BF9\u8C61\uFF0C\u6765\u505A\u5230\u5728\u5927\u591A\u6570\u573A\u666F\u4E0B\u4EE5 O (1) \u7684\u65F6\u95F4\u8BBF\u95EE\u8FD9\u4E9B\u7A0B\u5E8F\u5458\u672A\u505A\u4EFB\u4F55\u7ED3\u6784\u5B9A\u4E49\u5DE5\u4F5C\uFF08\u7C7B\u4F3C\u4E8E\u7C7B\u5B9A\u4E49\uFF09\u7684\u5BF9\u8C61\u3002</p><h2 id="\u53C2\u8003" tabindex="-1">\u53C2\u8003 <a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a></h2><ul><li><a href="https://jayconrod.com/posts/51/a-tour-of-v8--full-compiler" target="_blank" rel="noreferrer">A tour of V8: full compiler \u2014 jayconrod.com</a></li><li><a href="http://newhtml.net/v8-full-compiler/" target="_blank" rel="noreferrer">V8 \u4E4B\u65C5\uFF1Afull compiler \u2013 NewHTML</a></li></ul><div class="warning custom-block"><p class="custom-block-title">\u7248\u6743\u58F0\u660E</p><p>\u672C\u6587\u8F6C\u8F7D\u81EA<a href="http://newhtml.net/v8-full-compiler/" target="_blank" rel="noreferrer"> V8 \u4E4B\u65C5\uFF1Afull compiler</a>\uFF0C\u7FFB\u8BD1\u81EA\u539F\u6587<a href="https://jayconrod.com/posts/51/a-tour-of-v8--full-compiler" target="_blank" rel="noreferrer"> A tour of V8: full compiler</a>\uFF0C\u90E8\u5206\u5185\u5BB9\u9488\u5BF9\u539F\u6587\u6709\u6240\u4FEE\u6539\u3002\u672C\u6587\u5168\u90E8\u7248\u6743\u5F52\u539F\u4F5C\u8005\u6240\u6709\u3002</p></div>`,45),r=[p];function o(c,t,i,C,d,b){return n(),a("div",null,r)}const m=s(l,[["render",o]]);export{y as __pageData,m as default};
