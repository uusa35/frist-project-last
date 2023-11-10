import InputLabel from "@/components/InputLabel";
import { TextEditor } from "@/components/TextEditor";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { Tab } from "@headlessui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsData = {
  services: {
    ar: string;
    en: string;
    ru: string;
  };
};

type Props = {
  default_data: InputsData;
  onSubmit: SubmitHandler<InputsData>;
};

export default function CompanyServices({ default_data, onSubmit }: Props) {
  const trans: { [key: string]: string } = React.useContext(MainContext);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm({
    defaultValues: default_data,
  });

    console.log(getValues());
  return (
    <Tab.Panel>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}
      >
        <h1 className="text-2xl mb-10 mt-5">
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        <InputLabel value="خدمات الشركة" />
        <TextEditor
          defaultValue={getValues("services.ar")}
          language="ar"
          name="services"
          setValue={setValue}
        />

        <InputLabel value="Company’s Services" />
        <TextEditor
          defaultValue={getValues("services.en")}
          language="en"
          name="services"
          setValue={setValue}
        />

        <InputLabel value="Услуги компании" />
        <TextEditor
          defaultValue={getValues("services.ru")}
          language="ru"
          name="services"
          setValue={setValue}
        />

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button type="submit" className="btn-default">
            {trans.continue}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}
