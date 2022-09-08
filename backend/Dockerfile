FROM public.ecr.aws/sam/emulation-python3.9:latest-x86_64

COPY Pipfile ${LAMBDA_TASK_ROOT}
COPY Pipfile /asset-input/

RUN pip install pipenv==2022.4.8
RUN pipenv install

COPY . ${LAMBDA_TASK_ROOT}

CMD [ "python" ]
