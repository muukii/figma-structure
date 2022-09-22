// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma;
const {
  useSyncedState,
  usePropertyMenu,
  useEffect,
  waitForTask,
  AutoLayout,
  Text,
  SVG,
  Input,
  Frame,
  useWidgetId,
  Span,
  Rectangle,
  Ellipse,
  Line,
} = widget;

type Structure = {
  name: string;
  description: string;
  declarations: Declaration[];
};

type Declaration = {
  text: string;
  description: string;
};

function Widget() {
  const [structure, setStructure] = useSyncedState<Structure>("structure", {
    name: "",
    description: "",
    declarations: [],
  });

  return (
    <VStack
      verticalAlignItems={"center"}
      spacing={8}
      padding={16}
      cornerRadius={8}
      fill={"#252422"}
    >
      <HStack>
        <Input
          font={{ family: "Roboto Mono", style: "Bold" }}
          placeholder="Name"
          value={structure.name}
          fontSize={16}
          fill="#fffcf2"
          onTextEditEnd={(e) => {
            setStructure({ ...structure, name: e.characters });
          }}
        />
      </HStack>

      <Input
        font={{ family: "Roboto Mono", style: "Medium" }}
        placeholder="Description"
        value={structure.description}
        fontSize={12}
        fill="#fffcf2"
        onTextEditEnd={(e) => {
          setStructure({ ...structure, description: e.characters });
        }}
      />

      <VStack>
        <HStack horizontalAlignItems="end" width={"fill-parent"}>
          <TextButton
            title="+"
            onClick={() => {
              structure.declarations.push({
                text: "",
                description: "",
              });
              setStructure(structure);
            }}
          />
        </HStack>

        <VStack spacing={4}>
          {structure.declarations.map((declaration, index) => {
            return (
              <HStack spacing={8} verticalAlignItems="center">
                <Ellipse
                  name="Ellipse 1"
                  fill="#ECECEC"
                  width={6}
                  height={6}
                  opacity={0.2}
                />

                <Input
                  font={{ family: "Roboto Mono", style: "Medium" }}
                  width={250}
                  placeholder="Name"
                  value={declaration.text}
                  fontSize={12}
                  fill="#fffcf2"
                  onTextEditEnd={(e) => {
                    declaration.text = e.characters;
                    setStructure(structure);
                  }}
                />

                <Input
                  font={{ family: "Roboto Mono", style: "Medium" }}
                  width={200}
                  placeholder="Description"
                  value={declaration.description}
                  fontSize={12}
                  fill="#fffcf2"
                  onTextEditEnd={(e) => {
                    declaration.description = e.characters;
                    setStructure(structure);
                  }}
                />

                <TextButton
                  title="-"
                  onClick={() => {
                    const declarations = structure.declarations.filter(
                      (_, i) => {
                        return i != index;
                      }
                    );
                    structure.declarations = declarations;
                    setStructure(structure);
                  }}
                />
              </HStack>
            );
          })}
        </VStack>
      </VStack>
    </VStack>
  );
}

const VStack = (props: AutoLayoutProps) => {
  const composed = props;
  composed.direction = "vertical";
  return <AutoLayout {...composed} />;
};

const HStack = (props: AutoLayoutProps) => {
  const composed = props;
  composed.direction = "horizontal";
  return <AutoLayout {...composed} />;
};

const TextButton = (args: {
  title: string;
  fontSize?: number;
  onClick: () => void;
}) => {
  return (
    <AutoLayout
      verticalAlignItems="center"
      height="hug-contents"
      padding={2}
      cornerRadius={8}
    >
      <Text
        fill="#eb5e28"
        fontSize={args.fontSize ?? 14}
        onClick={args.onClick}
      >
        {args.title}
      </Text>
    </AutoLayout>
  );
};

widget.register(Widget);
