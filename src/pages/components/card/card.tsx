import { CheckCircleIcon, BugAntIcon, XCircleIcon } from '@heroicons/react/24/outline'

export function Card() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
        <div className="text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-red-500 left-4 -top-6">
          <BugAntIcon className="block h-6 w-6" aria-hidden="true" />
        </div>
        <div className="mt-8">
          <p className="text-xl font-semibold my-2">ANDRÔMEDA-1602</p>
          <div className="flex space-x-2 text-gray-400 text-sm">
            <div class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">Front</div>
            <div class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">Back</div>
            <div class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-200 text-purple-700 rounded-full">Infra</div>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm my-3">
            <p>2 Days in Ready for Deploy</p> 
          </div>
          <div className="border-t-2"></div>

          <div className="flex justify-between">
            <div class="my-2">
                <p class="font-semibold text-base mb-2">Author</p>
                <div class="flex space-x-2">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                    class="w-6 h-6 rounded-full"/>
                </div>
            </div>
            <div class="my-2">
              <p class="font-semibold text-base mb-2">Approves</p>
              <div class="text-base text-gray-400 font-semibold">
                  <p>3</p>
              </div>
            </div>
          </div>

          <div className="border-t-2"></div>

          <div className="flex justify-between">
            <div class="my-3">
                <p class="font-semibold text-base mb-2">Front</p>
                <div class="flex space-x-2">
                  <CheckCircleIcon className="block h-6 w-6 text-green-700" aria-hidden="true" />
                </div>
            </div>
            <div class="my-3">
                <p class="font-semibold text-base mb-2">Back</p>
                <div class="flex space-x-2">
                  <XCircleIcon className="block h-6 w-6 text-red-700" aria-hidden="true" />
                </div>
            </div>
            <div class="my-3">
                <p class="font-semibold text-base mb-2">Infra</p>
                <div class="flex space-x-2">
                  <CheckCircleIcon className="block h-6 w-6 text-green-700" aria-hidden="true" />
                </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}