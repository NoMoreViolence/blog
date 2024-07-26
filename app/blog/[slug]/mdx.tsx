import jsx from "acorn-jsx";
import { Parser } from "acorn";
import { visit } from "unist-util-visit";

const parser = Parser.extend(jsx());

const lang = new Set(["js", "jsx", "javascript"]);

type UnistNode = import("unist").Node;

export function remarkMdxEvalCodeBlock() {
  return (tree: UnistNode) => {
    visit(
      tree,
      "code",
      (
        node: import("unist").Literal & {
          lang: string;
          meta: string;
          value: string;
        },
        index: number,
        parent: import("unist").Parent
      ) => {
        if (lang.has(node.lang) && node.meta === "eval") {
          const program = parser.parse(node.value, {
            ecmaVersion: 2020,
            sourceType: "module",
          });

          const output = {
            type: "mdxFlowExpression",
            value: "",
            data: {
              estree: {
                type: "Program",
                body: [
                  {
                    type: "ExpressionStatement",
                    expression: {
                      type: "CallExpression",
                      callee: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        expression: false,
                        generator: false,
                        async: false,
                        params: [],
                        body: {
                          type: "BlockStatement",
                          body: [
                            ...program.body.slice(0, -1),
                            {
                              type: "ReturnStatement",
                              argument: program.body.at(-1),
                            },
                          ],
                        },
                      },
                      arguments: [],
                      optional: false,
                    },
                  },
                ],
              },
            },
          };
          parent.children.splice(index, 1, output);
        }
      }
    );
  };
}
