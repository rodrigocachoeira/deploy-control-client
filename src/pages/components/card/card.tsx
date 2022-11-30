import { CheckCircleIcon, BugAntIcon, XCircleIcon, NewspaperIcon } from '@heroicons/react/24/outline';

import { CardProps } from './types';

export function Card(props: CardProps) {
  return (
	<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
        <div className={'text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl left-4 -top-6 ' + getCardBg(props.type) }>
          {renderCardImage(props.type)}
        </div>
        <div className="mt-8">
          <p className="text-xl font-semibold my-2">{props.title}</p>

          <div className="flex space-x-2 text-gray-400 text-sm">
            {props.tags.map(tag => {
                return (<div key={tag} >{renderTag(tag)}</div>);
            })}
          </div>

          <div className="border-t-2"></div>

          <div className="flex mt-5 justify-between">
              <div className="my-2">
                  <p className="font-semibold text-base mb-2">Author</p>
                  <div className="flex space-x-2">
                      <img title={props.author.email} src={props.author.image} className="w-6 h-6 rounded-full"/>
                </div>
            </div>
              <div className="my-2">
                  <p className="font-semibold text-base mb-2">Approves</p>
                  <div className="text-base text-gray-400 font-semibold">
                  <p>{props.approvesCount.toString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t-2"></div>

          <div className="flex justify-between">

            {
              props.tags.includes('FRONT') ?
              (
                <div className="my-3">
                  <p className="font-semibold text-base mb-2">Front</p>
                  <div className="flex space-x-2">
                      {
                        props.requestedReviews.front
                        ?
                        (<CheckCircleIcon className="block h-6 w-6 text-green-700" aria-hidden="true" />)
                        :
                        (<XCircleIcon className="block h-6 w-6 text-red-700" aria-hidden="true" />)
                      }
                  </div>
                </div>
              ) : ''
            }

            {
              props.tags.includes('BACK') ?
              (
                      <div className="my-3">
                          <p className="font-semibold text-base mb-2">Back</p>
                          <div className="flex space-x-2">
                    {
                      props.requestedReviews.back
                      ?
                      (<CheckCircleIcon className="block h-6 w-6 text-green-700" aria-hidden="true" />)
                      :
                      (<XCircleIcon className="block h-6 w-6 text-red-700" aria-hidden="true" />)
                    }
                  </div>
                </div>
              ) : ''
            }

            {
              props.tags.includes('INFRA') ?
              (
                      <div className="my-3">
                          <p className="font-semibold text-base mb-2">Infra</p>
                          <div className="flex space-x-2">
                    {
                      props.requestedReviews.infra
                      ?
                      (<CheckCircleIcon className="block h-6 w-6 text-green-700" aria-hidden="true" />)
                      :
                      (<XCircleIcon className="block h-6 w-6 text-red-700" aria-hidden="true" />)
                    }
                  </div>
                </div>
              ) : ''
            }

          </div>

        </div>

      </div>
    </section>
  )
}

function renderTag(tag: string) {
  let bgColor = '';

  switch (tag) {
    case 'FRONT':
      bgColor = 'bg-green-200 text-green-700';
      break;
    case 'BACK':
      bgColor = 'bg-blue-200 text-blue-700';
      break;
    case 'INFRA':
      bgColor = 'bg-purple-200 text-purple-700';
      break;
  }

  return (
    <div className={
      'text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ' + bgColor
    }>
      {tag}
    </div>
  );
}

function getCardBg(type: string) {
  switch (type) {
    case 'bug':
      return 'bg-red-700';
    case 'task':
      return 'bg-blue-700';
    default:
      break;
  }
}

function renderCardImage(type: string) {
  switch (type) {
    case 'bug':
      return <BugAntIcon className="block h-6 w-6" aria-hidden="true" />;
    case 'task':
      return <NewspaperIcon className="block h-6 w-6" aria-hidden="true" />;
    default:
      break;
  }
}