"use client";
import { useContext } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { filter, flatten, indexOf, map } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  addProductChoice,
  removeProductChoice,
} from "@/src/redux/slices/productSlice";
import { useTranslation } from "react-i18next";

export default function ({ group }: { group: any }) {
  const { t } = useTranslation("trans");
  const dispatch = useAppDispatch();
  const {
    product: { selections },
  } = useAppSelector((state) => state);

  return (
    <div className='py-3'>
      <div className='flex pb-2 flex-1 justify-between items-center'>
        <div className='flex flex-col '>
          <label className='text-base text-gray-900 ltr:text-left rtl:text-right'>
            {group.name} - {group.id}
          </label>
          <p className='text-sm text-gray-400 ltr:text-left rtl:text-right'>
            {t("select_up_to", {
              max: group.max_number,
              min: group.min_number,
            })}
          </p>
        </div>
        <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600 capitalize'>
          {t(group.selection_type)}
        </div>
      </div>
      {group.choices &&
        map(group.choices, (c, i) => (
          <fieldset key={i}>
            <div className='gap-y-4 py-1 flex justify-between items-center'>
              <div className='relative flex items-start'>
                <div className='flex items-center'>
                  <input
                    id='comments'
                    aria-describedby='comments-description'
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(
                          addProductChoice({
                            group_id: group.id,
                            choice_id: c.id,
                            qty: 1,
                            multi:
                              (group.input_type === "checkbox" &&
                                group.max_number > 1) ||
                              (group.input_input_type !== "checkbox" &&
                                group.max_number > 1),
                            required: group.selection_type !== "optional",
                            min: group.min_number,
                            max: group.max_number,
                          })
                        );
                      } else {
                        dispatch(
                          removeProductChoice({
                            group_id: group.id,
                            choice_id: c.id,
                            multi:
                              (group.input_type === "checkbox" &&
                                group.max_number > 1) ||
                              (group.input_input_type !== "checkbox" &&
                                group.max_number > 1),
                            required: group.selection_type !== "optional",
                            min: group.min_number,
                            max: group.max_number,
                          })
                        );
                      }
                    }}
                    type='checkbox'
                    checked={
                      indexOf(
                        map(
                          flatten(
                            map(filter(selections, "choices"), "choices")
                          ),
                          "choice_id"
                        ),
                        c.id
                      ) >= 0
                    }
                    className='h-4 w-4 rounded border-gray-300 text-picks-dark focus:ring-picks-dark'
                  />
                </div>
                <div className='ps-2 text-sm leading-6'>
                  <label
                    htmlFor='comments'
                    className='font-medium text-gray-900'>
                    {c.name} - {c.id}
                  </label>{" "}
                  <span className='text-gray-500 hidden'>
                    <span className='sr-only'>New comments </span>
                    so you always know what's happening.
                  </span>
                </div>
              </div>
              <div>{c.price_format}</div>
            </div>
          </fieldset>
        ))}
    </div>
  );
}
